package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.exceptions.StateException;
import com.gluk.dagaz.api.state.IPosition;
import com.gluk.dagaz.api.state.IState;

public abstract class AbstractState extends AbstractValue implements IState {

	private int turnNumber = 0;
	private int turnOrder = 0;
	private Map<String, IPosition> positions = new HashMap<String, IPosition>();
	private IState prevState = null;
	
	protected abstract AbstractState createClone();
	
	protected void setPrevState(IState prevState) {
		this.prevState = prevState;
	}
	
	protected void addPosition(String name, IPosition position) {
		positions.put(name, position);
	}

	public int getTurnNumber() {
		return turnNumber;
	}

	public void setTurnNumber(int turnNumber) {
		this.turnNumber = turnNumber;
	}
	
	public int getTurnOrder() {
		return turnOrder;
	}

	public void setTurnOrder(int turnOrder) {
		this.turnOrder = turnOrder;
	}

	public IPosition getPosition(String position) {
		IPosition r = positions.get(position);
		if (r == null) {
			r = new Position();
			positions.put(position, r);
		}
		return r;
	}
	
	public IState getClone() {
		AbstractState r = createClone();
		r.setPrevState(this);
		r.setTurnOrder(this.turnOrder);
		copyValuesTo(r);
		for (String name: positions.keySet()) {
			IPosition p = positions.get(name);
			if ((p != null) && p.isClonable()) {
				r.addPosition(name, p.getClone());
			}
		}
		return r;
	}

	public IState getPrevState() throws StateException {
		if (prevState == null) {
			throw new StateException("Prev State Undefined");
		}
		return prevState;
	}

	public boolean isInitialState() {
		return (prevState == null);
	}
}
