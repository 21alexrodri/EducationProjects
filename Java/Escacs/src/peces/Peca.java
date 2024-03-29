package peces;


import joc.MyColor;
import joc.Posicio;
import joc.Tauler;


public abstract class Peca implements Ordenable, Comparable {	
	protected MyColor equip;
	protected int valor;
	protected Posicio posicio;
	
	public Peca (MyColor pCol, int valor, Posicio pos) {
		this.equip = pCol;
		this.valor = valor;
		this.posicio = pos;
	}	

	public abstract boolean[][] posicionsPosibles();
	public abstract boolean movimentPosible(Tauler tauler, Posicio posicioNova);
	
	public boolean[][] movimentsPosibles(Tauler tauler) {
		boolean [][] movimientsPosibles = new boolean [8][8];
	       
        for(int i = 0; i < 8; i++){
            for(int j = 0; j < 8; j++){
                if (movimentPosible(tauler, new Posicio(i,j)))
                    movimientsPosibles[i][j] = true;                
            }
        } 
        
        for (int j = 7; j>=0; j--) {
            for (int i = 0; i<8; i++) {
                if(movimientsPosibles[i][j]){
                    System.out.print("|("+i+","+j+")|");
                    continue;
                }
                System.out.print("| |");
            }
            System.out.println("");
        }
   
        return movimientsPosibles;
	}
	
	public boolean hihaMovimentsPosibles(Tauler tauler) {
		boolean [][] movimentsPosibles = this.movimentsPosibles(tauler);
		for (int i=0; i<8 ; i++) {
			for (int j=0; j<8; j++) {
				if (movimentsPosibles[i][j]) return true;
			}
		}
		return false;
	}

	public MyColor getEquip() {
		return equip;
	}
	
	public int getValor() {
		return this.valor;
	}
	
	public Posicio getPosicio() {
		return this.posicio;
	}
	
	public void setPosicio(Posicio pos) {
		this.posicio = pos;
	}
	
	public boolean isMateixEquip(MyColor col) {
		return this.equip.equals(col);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Peca other = (Peca) obj;
		if (valor != other.valor)
			return false;
		return true;
	}

	@Override
	public int compareTo(Object arg0) {
		if (arg0 == null)
			throw new NullPointerException("No es pot comparar amb un null");
		if (this.getClass() != arg0.getClass())
			throw new ClassCastException("No es poden comparar objectes de difernt tipus");
		Peca other = (Peca) arg0;
		if (this.valor < other.getValor()) 
			return -1;
		if (this.valor > other.getValor()) 
			return 1;
		return 0;
	}

	@Override
	public int compareTo(Ordenable arg0) {
		return this.compareTo(arg0);
	}

	@Override
	public String toString() {
		return ((this.equip==MyColor.BLANC) ? "b" : "n");
	}
}
