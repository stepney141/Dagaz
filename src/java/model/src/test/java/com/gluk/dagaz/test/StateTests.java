package com.gluk.dagaz.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.gluk.dagaz.api.application.IMoveGenerator;
import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.mock.MockMoveGenerator;
import com.gluk.dagaz.model.Board;
import com.gluk.dagaz.model.Players;
import com.gluk.dagaz.runtime.Value;
import com.gluk.dagaz.state.GlobalEnvironment;
import com.gluk.dagaz.state.LocalEnvironment;
import com.gluk.dagaz.state.MoveLogger;
import com.gluk.dagaz.state.PlayersEnvironment;
import com.gluk.dagaz.state.State;

// TODO: State, StateEnvironment

public class StateTests {

	@Test
	public void testGlobalEnvironment() throws CommonException {
		IEnvironment ge = new GlobalEnvironment();
		assertFalse(ge.isDefined("x"));                                                  // Переменная не определена
		assertTrue(ge.get("x").getNumber() == 0);                                        // Запрос значения переменной создаёт её в глобальном окружении (значение по умолчанию - 0)
		assertTrue(ge.isDefined("x"));
		assertFalse(ge.isDefined("y"));
		ge.set("x", Value.create("abc"));
		ge.set("y", Value.create(1));
		assertTrue(ge.isDefined("x"));                                                  // Операция set также создаёт переменную в глобальном коружении
		assertTrue(ge.isDefined("y"));                                                  // Операция let глобальным окружением не поддерживается
		assertTrue(ge.get("x").getString().equals("abc"));  
		assertTrue(ge.get("y").getNumber() == 1);
		ge.del("x");                                                                    // Операция del удаляет определение переменной из глобального окружения
		assertFalse(ge.isDefined("x"));                                                 // Точки сохранения и откаты глобальным окружением не поддерживаются
		assertTrue(ge.isDefined("y"));
	}

	@Test
	public void testPlayerEnvironment() throws CommonException {
		IEnvironment ge = new GlobalEnvironment();
		ge.set("x", Value.create(1));                                                  // Значение x определено в глобальном окружении
		Players p = new Players();
		p.addPlayer("White");                                                          // Определяются игроки
		p.addPlayer("Black");
		IEnvironment pe = new PlayersEnvironment(p, 2, ge);                            // Окружение для второго по счёту хода (первый ход чёрных)
		assertTrue(pe.isDefined(IReserved.PLAYER_CURRENT));                            // Статические псевдопеременные окружения хода
		assertTrue(pe.isDefined(IReserved.PLAYER_NEXT));
		assertTrue(pe.isDefined(IReserved.PLAYER_TURN));
		assertTrue(pe.isDefined(IReserved.PLAYER_ORDER));
		assertTrue(pe.isDefined("White"));                                             // Динамические псевдопеременные окружения хода
		assertTrue(pe.isDefined("Black"));                                             // для определения дружественности игроков
		assertFalse(pe.isDefined("Green"));                                            // Игрок Green не был опаределён, значение не известно
		assertTrue(pe.isDefined("x"));                                                 // Значение x доступно в глобальном окружении
		assertFalse(pe.isDefined("y"));                                                // Значение у не определялось
		p.addSymmetry("Black", "n", "s");                                              // Определяются симметрии для второго игрока
		p.addSymmetry("Black", "s", "n");
		assertTrue(pe.isDefined("n"));                                                 // В окружении хода созданы новые динмические псевдопеременные 
		assertTrue(pe.isDefined("s"));                                                 // для переопределения направлений, в соответствии с заданными симметриями
		assertTrue(pe.get(IReserved.PLAYER_CURRENT).getString().equals("Black"));      // Игрок выполняющий текущий ход (Black)
		assertTrue(pe.get(IReserved.PLAYER_NEXT).getString().equals("White"));         // Игрок выполняющий следующий ход (White)
		assertTrue(pe.get(IReserved.PLAYER_TURN).getNumber() == 1);                    // Номер хода - первый
		assertTrue(pe.get(IReserved.PLAYER_ORDER).getNumber() == 2);                   // Номер очереди в рамках хода - второй
		assertFalse(pe.get("White").getBoolean());                                     // Игрок White враждебен
		assertTrue(pe.get("Black").getBoolean());                                      // Игрок Black дружественен (игрок дружественен сам себе)
		assertTrue(pe.get("n").getString().equals("s"));                               // Направлению n (для текущего игрока Black) соответствует s

		pe = new PlayersEnvironment(p, 3, ge);                                         // Окружение для третьего по счёту хода (второй ход белых)
		assertTrue(pe.isDefined("n"));                                                 // Имена направлений (для заданных симметрий) по прежнему определены
		assertTrue(pe.isDefined("s")); 
		assertTrue(pe.get(IReserved.PLAYER_CURRENT).getString().equals("White"));      // Текущий игрок - White
		assertTrue(pe.get(IReserved.PLAYER_NEXT).getString().equals("Black"));         // Следующий игрок - Black
		assertTrue(pe.get(IReserved.PLAYER_TURN).getNumber() == 2);                    // Номер хода - второй
		assertTrue(pe.get(IReserved.PLAYER_ORDER).getNumber() == 1);                   // Номер очереди в рамках хода - первый
		assertTrue(pe.get("White").getBoolean());                                      // White - дружетвенен
		assertFalse(pe.get("Black").getBoolean());                                     // Black - враждебен
		assertTrue(pe.get("n").getString().equals("n"));                               // Направление n (для текущего игрока White) соответствует самому себе 
	}

	@Test
	public void testLocalEnvironment() throws CommonException {
		IEnvironment ge = new GlobalEnvironment();                                     // Создаётся глобальное окружение
		LocalEnvironment env = new LocalEnvironment(ge);                               // Локальное окружение создаётся поверх глобального
		assertTrue(env.isDefined("true"));                                             
		assertTrue(env.isDefined("false"));                                            
		assertTrue(env.get("true").getBoolean());                                      // Константа, возвращающая истинное значение
		assertFalse(env.get("false").getBoolean());                                    // Константа, возвращающая ложное значение
		assertTrue(env.isDefined("123"));                                              
		assertTrue(env.isDefined("\"abc\""));                                          
		assertTrue(env.get("123").getNumber() == 123);                                 // Цепочки цифр интерпретируются как числовые значения
		assertTrue(env.get("\"abc\"").getString().equals("abc"));                      // Цепочки символов в кавычках интерпретируются как строковые значения
		assertFalse(env.isDefined("x"));                                               // Значение x не определено
		assertTrue(env.get("x").getNumber() == 0);                                     // Значение x автоматически создаётся в глобальном окружении (x = 0)
		assertTrue(env.isDefined("x"));                                                // Значение x определено в глобальном окружении
		assertFalse(env.isKnown("x"));                                                 // Значение x не известно локальному оккружению
		env.savepoint();                                                               // Точка схранения (1) для локального окружения
		env.let("x", Value.create(1));                                                 // Перекрывается значение в локальном окружении (x = 1)
		env.let("y", Value.create(10));                                                // Создаётся переменная в локальном окружении (y = 10)  
		assertTrue(env.isKnown("x"));                                                  // Значение x известно
		assertTrue(env.get("x").getNumber() == 1);                                     // и берётся из локального окружения
		env.savepoint();                                                               // Точка схранения (2)
		env.set("x", Value.create(2));                                                 // Изменяется значение в локальном окружении
		assertTrue(env.get("x").getNumber() == 2);                                     // x = 2
		env.set("x", Value.create(3));                                                 // Изменяется значение в локальном окружении
		assertTrue(env.get("x").getNumber() == 3);                                     // x = 3
		env.let("x", Value.create(4));                                                 // Перекрывается значение в локальном окружении
		assertTrue(env.get("x").getNumber() == 4);                                     // x = 4
		env.del("x");                                                                  // Удаляется значение (x = 4) предыдущее значение вновь доступно
		assertTrue(env.get("x").getNumber() == 3);                                     // x = 3
		assertTrue(env.get("y").getNumber() == 10);                                    // Значение (y = 10) доступно
		assertTrue(env.rollback());                                                    // Откат к точке сохранения (2)
		assertTrue(env.get("x").getNumber() == 1);                                     // x = 1
		assertTrue(env.rollback());                                                    // Откат к точке сохранения (1) все переменные локального окружения удалены
		assertTrue(env.get("x").getNumber() == 0);                                     // x = 0
		assertFalse(env.isKnown("x"));                                                 // x определено в глобальном окружении
		assertFalse(env.isDefined("y"));                                               // Значение у не известно
		assertFalse(env.rollback());                                                   // Больше нет точек сохранения
	}
	
	@Test
	public void testMoveLogger() throws CommonException {
		IEnvironment env = new GlobalEnvironment();
		IMoveGenerator mg = new MockMoveGenerator();
		Board board = new Board();
		State state = new State(board);
		IMoveLogger ml = new MoveLogger(state, mg);
		ml.savepoint();                                                                // Точка сохранения (1)
		ml.log("e2");                                                                  // Начинается запись хода
		ml.savepoint();                                                                // Точка сохранения (2)
		ml.log("-e4");                                                                 // Дополняется строка записи хода
		ml.endMove(env);                                                               // Формируется итоговая нотация
		assertTrue(mg.toString().equals("e2-e4"));                                     // e2-e4
		ml.savepoint();                                                                // Точка сохранения (3)
		ml.log("=King");                                                               // Запись хода продолжается
		ml.endMove(env);                                                               // Формируется итоговая нотация
		assertTrue(mg.toString().equals("e2-e4=King"));                                // e2-e4=King
		assertTrue(ml.rollback());                                                     // Откат к точке сохранения (3)
		ml.endMove(env);                                                               // Формируется итоговая нотация
		assertTrue(mg.toString().equals("e2-e4"));                                     // e2-e4
		assertTrue(ml.rollback());                                                     // Откат к точке сохранения (2)
		ml.log("-e3");                                                                 // Дополняется строка записи хода
		ml.endMove(env);                                                               // Формируется итоговая нотация
		assertTrue(mg.toString().equals("e2-e3"));                                     // e2-e3 
		assertTrue(ml.rollback());                                                     // Откат к точке сохранения (2)
		ml.endMove(env);                                                               // Формируется итоговая нотация
		assertTrue(mg.toString().isEmpty());                                           // Строка записи ход пуста
		assertFalse(ml.rollback());                                                    // Больше нет точек сохранения
	}

	@Test
	public void testStateGlobal() throws CommonException, CloneNotSupportedException {
		Board board = new Board();
		board.addPosition("a1"); 
		board.addPosition("a2");
		board.setDefaultValue("x", Value.create(0));                                   // Определяется переменная уровня доски (x = 0)
		State state = new State(board);
		assertTrue(state.getCurrentPosition() == null);
		
		state.savepoint();                                                            // Точка сохранения (1)
		assertTrue(state.getValue("x").getNumber() == 0);                             // Значение по умолчанию x = 0 (не привязано к позиции доски)
		assertTrue(state.getValue("y") == null);                                      // Значение y не определено
		state.setValue("x", Value.create(1));                                         // Изменяется значение (x = 1)
		assertTrue(state.getValue("x").getNumber() == 1);
		assertTrue(state.getValue("y") == null);
		
		state.savepoint();                                                            // Точка сохранения (2)
		state.setCurrentPosition("a1");                                               // Устанавливается текущая позиция (a1)
		assertTrue(state.getCurrentPosition().equals("a1"));                                 // Проверяется установка текущей позиции
		state.setValue("y", Value.create(2));                                         // Создаётся значение (y = 2) привязанное к позиции a1
		assertTrue(state.getValue("x").getNumber() == 1);
		assertTrue(state.getValue("y").getNumber() == 2);
		
		state.savepoint();                                                            // Точка сохранения (3)
		state.setCurrentPosition("a2");                                               // Текущая позиция изменяется (a2)
		assertTrue(state.getCurrentPosition().equals("a2"));
		assertTrue(state.getValue("x").getNumber() == 1);                             // Значение (x = 1) не привязано к текущей позиции
		assertTrue(state.getValue("y") == null);                                      // Значение y не определено для позиции a2
		
		state.savepoint();                                                            // Точка сохранения (4)
		state.setValue("x", Value.create(3));                                         // Изменяется значение (x = 3) не привязанное к позиции
		state.setValue("y", Value.create(4));                                         // Создаётся значение (y = 4) привязанное к позиции a2
		assertTrue(state.getValue("x").getNumber() == 3);
		assertTrue(state.getValue("y").getNumber() == 4);
		
		state.savepoint();                                                            // Точка сохранения (5)
		state.setCurrentPosition("a1");                                               // Текущая позиция изменяется (a1)
		assertTrue(state.getCurrentPosition().equals("a1"));
		assertTrue(state.getValue("x").getNumber() == 3);                             // Значение x было изменено (x = 3)
		assertTrue(state.getValue("y").getNumber() == 2);                             // Для позиции a1 значение (y = 2)
		
		State newState = (State)state.clone();                                        // При выполнении клонирования состояния
		assertTrue(newState.getValue("x").getNumber() == 3);                          // наследуются значения не привязанные к позиции
		assertTrue(newState.getValue("y") == null);                                   // Значения, временно привязанные к позициям (позиционные флаги), сбрасываюся 
		assertTrue(newState.getCurrentPosition() == null);                                   // Текущая позиция сбрасывается тоже
		assertFalse(newState.rollback());                                             // Нет точек сохранения для клонированного состояния
		
		assertTrue(state.rollback());                                                 // Откат к точке сохранения (5)
		assertTrue(state.getCurrentPosition().equals("a2"));
		assertTrue(state.getValue("x").getNumber() == 3);
		assertTrue(state.getValue("y").getNumber() == 4);

		assertTrue(state.rollback());                                                 // Откат к точке сохранения (4)
		assertTrue(state.getCurrentPosition().equals("a2"));
		assertTrue(state.getValue("x").getNumber() == 1);
		assertTrue(state.getValue("y") == null);

		assertTrue(state.rollback());                                                 // Откат к точке сохранения (3)
		assertTrue(state.getCurrentPosition().equals("a1"));
		assertTrue(state.getValue("x").getNumber() == 1);
		assertTrue(state.getValue("y").getNumber() == 2);

		assertTrue(state.rollback());                                                 // Откат к точке сохранения (2)
		assertTrue(state.getCurrentPosition() == null);
		assertTrue(state.getValue("x").getNumber() == 1);
		assertTrue(state.getValue("y") == null);

		assertTrue(state.rollback());                                                 // Откат к точке сохранения (1)
		assertTrue(state.getCurrentPosition() == null);
		assertTrue(state.getValue("x").getNumber() == 0);
		assertTrue(state.getValue("y") == null);
		assertFalse(state.rollback());                                                // Больше нет точек сохранения
	}
}
