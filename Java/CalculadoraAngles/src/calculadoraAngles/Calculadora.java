package calculadoraAngles;

import java.util.ArrayList;
import java.util.List;

import javax.swing.DefaultComboBoxModel;
import javax.swing.JComboBox;
import javax.swing.JOptionPane;

/*
Java GUI 2: Calculator Logic

This part introduces a calculator class designed to handle arithmetic operations specifically formatted as degrees, minutes, and seconds. 
It includes methods for parsing the operation, validating input, and performing the calculation.

    Calculadora: A class responsible for the calculator's logic. It stores the operation, operands, and the history of operations. 
	It also includes methods to parse operations, validate integer input, and calculate the final result, 
	which is then displayed in a JComboBox for historical viewing.

*/


public class Calculadora {
	private String operacio;
	private String operador;
	private String valor1;
	private String valor2;
	private List<String> historial;
	private JComboBox<String> btnHistorial;

	
	public Calculadora(String operacio, JComboBox<String> btnHistorial) {
		this.operacio = operacio;
		this.historial = new ArrayList<>();
		this.btnHistorial = btnHistorial;
		
	}

	public String operacio(String frase) {
		this.operacio = frase;
		return this.operacio;

	}

	
	public List<String> getHistorial() {
        return historial;
    }
	  public String operadorEscollit() {
	        try {
	            if (this.operacio.contains(String.valueOf("+"))) {
	                this.operador = "+";
	            } else if (this.operacio.contains(String.valueOf("-"))) {
	                this.operador = "-";
	            } else {
	                throw new Exception("La operación no contiene + ni -");
	            }
	        } catch (Exception e) {
	            JOptionPane.showMessageDialog(null, "Error: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
	        }
	        return this.operador;
	    }
	  private int validarEnter(String valor) throws NumberFormatException {
		    int enter = Integer.parseInt(valor);
		    if (enter < 0) {
		        throw new NumberFormatException("Número negativo: " + valor);
		    }
		    return enter;
		}

	public String operacioFinal(String frase) {
		try {
		String[] partes = frase.split("\\"+this.operador);
		String parte1 = partes[0];
		String parte2 = partes[1];
		String[] valors_part1 = parte1.split(":");
		System.out.println(valors_part1[0]);
		String[] valors_part2 = parte2.split(":");
		int part1_segons = 0;
		int part1_minuts = 0;
		int part1_graus = 0;
		int part2_segons = 0;
		int part2_minuts = 0;
		int part2_graus = 0;
		int resultat_segons = 0;
		int resultat_minuts = 0;
		int resultat_graus = 0;
		String resultat;

		 if (valors_part1.length == 3) {
	            part1_segons = validarEnter(valors_part1[2]);
	            part1_minuts = validarEnter(valors_part1[1]);
	            part1_graus = validarEnter(valors_part1[0]);
	        } else if (valors_part1.length == 2) {
	            part1_segons = validarEnter(valors_part1[1]);
	            part1_minuts = validarEnter(valors_part1[0]);
	        } else if (valors_part1.length == 1) {
	            part1_segons = validarEnter(valors_part1[0]);
	        }

		 if (valors_part2.length == 3) {
	            part2_segons = validarEnter(valors_part2[2]);
	            part2_minuts = validarEnter(valors_part2[1]);
	            part2_graus = validarEnter(valors_part2[0]);
	        } else if (valors_part2.length == 2) {
	            part2_segons = validarEnter(valors_part2[1]);
	            part2_minuts = validarEnter(valors_part2[0]);
	        } else if (valors_part2.length == 1) {
	            part2_segons = validarEnter(valors_part2[0]);
	        }
		
		if(this.operador == "+") {
			
			resultat_segons = part1_segons + part2_segons;
			if(resultat_segons >= 60) {
				int count = 0;
				do{
					resultat_segons = resultat_segons - 60;
					count++;
					
				}while(resultat_segons>=60);
				
				part1_minuts = part1_minuts + count;
			}
			resultat_minuts = part1_minuts + part2_minuts;
			if(resultat_minuts >=60) {
				int count = 0;
				do {
				resultat_minuts = resultat_minuts - 60;
				count++;
				
				}while(resultat_minuts>=60);
				part1_graus = part1_graus + count;
			}
			resultat_graus = part1_graus + part2_graus;
			if(resultat_graus > 360) {
				do{
					resultat_graus = resultat_graus - 360;
					
				}while(resultat_graus > 360);
			}
			
		}
		if(this.operador == "-") {
			resultat_segons = part1_segons - part2_segons;
			resultat_segons = Math.abs(resultat_segons);
			if(resultat_segons >= 60) {
				int count = 0;
				do {
					resultat_segons = resultat_segons -60;
					count++;
				}while(resultat_segons >= 60);
				part1_minuts = part1_minuts - count;
			}
			resultat_minuts = part1_minuts - part2_minuts;
			resultat_minuts = Math.abs(resultat_minuts);
			if(resultat_minuts >=60) {
				int count = 0;
				do {
					resultat_minuts = resultat_minuts - 60;
					count++;
				}while(resultat_minuts >= 60);
				
				
				part1_graus = part1_graus - count;
			}
			resultat_graus = part1_graus - part2_graus;
			resultat_graus = Math.abs(resultat_graus);
			if(resultat_graus > 360) {
				do{
					resultat_graus = resultat_graus - 360;
					
				}while(resultat_graus > 360);
				
			}
		}
		
		resultat = resultat_graus+":"+resultat_minuts+":"+resultat_segons;
		
		
		historial.add(frase + "= "+resultat);
		
		DefaultComboBoxModel<String> model = new DefaultComboBoxModel<>(historial.toArray(new String[0]));
		btnHistorial.setModel(model);
		return resultat;
		}catch(NumberFormatException e) {
			 JOptionPane.showMessageDialog(null, "Error: Número negativo", "Error", JOptionPane.ERROR_MESSAGE);
		        return "";
		}

	}
}
