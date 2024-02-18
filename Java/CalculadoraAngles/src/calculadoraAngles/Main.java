package calculadoraAngles;

import java.awt.EventQueue;

import javax.swing.JFrame;
import java.awt.BorderLayout;
import javax.swing.JPanel;
import javax.swing.JSplitPane;
import javax.swing.KeyStroke;
import javax.swing.border.BevelBorder;
import java.awt.Color;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.TextField;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;


import javax.swing.AbstractAction;
import javax.swing.Action;
import javax.swing.ImageIcon;

import java.awt.Dimension;
import java.awt.Component;
import java.awt.Rectangle;
import java.awt.ComponentOrientation;
import java.awt.Cursor;
import java.awt.Point;
import javax.swing.JComboBox;
import java.awt.Font;

/*

Java GUI 3: Main Application Window

The final section describes the main application window setup. It demonstrates how to create a user interface with buttons for digits, operations, and 
functionalities like delete and clear. It also shows how to handle button clicks and keyboard inputs to perform calculations.

    Main: The main class of the application that initializes the GUI components of the calculator. 
	It sets up a JFrame with a specific layout, including panels for input (JTextField), operation buttons (JButton), and a history dropdown (JComboBox). 
	It also includes event listeners for buttons and keyboard keys to perform calculations or update the display based on user interaction.

Each of these sections leverages Java Swing components to create a graphical user interface, demonstrating the construction 
of a simple yet functional calculator application that handles degrees, minutes, and seconds calculations. 
The application also provides a help window for user guidance and maintains a history of performed operations for quick reference.


*/



public class Main {
	private JFrame frame;
	private JComboBox<String> comboBoxTemas;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Main window = new Main();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public Main() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
	
		frame = new JFrame();
		  Color panel_sth = new Color(54,38,15);
          Color boton_letra = new Color(90, 63, 31);
          Color boton_fondo = new Color(230, 223, 213);
          Color botonT2_fondo = new Color(54, 38, 15);
          Color panel_cntr = new Color(119, 118, 123);
          Color textfield_color = new Color(205, 171, 143);
		
		frame.getContentPane().setLayout(new BorderLayout(0, 0));
		frame.setBounds(100, 100, 350, 400);
		frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		frame.setMinimumSize(new java.awt.Dimension(400,450));
		
		JPanel panel_center = new JPanel();
		panel_center.setBackground(panel_cntr);
		frame.getContentPane().add(panel_center, BorderLayout.CENTER);
		panel_center.setLayout(new GridLayout(0, 1, 0, 0));
		
		TextField textField = new TextField();
		textField.setFont(new Font("Monospaced", Font.BOLD, 18));
		textField.setForeground(new Color(54, 38, 15));
		textField.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		textField.setEditable(false);
	
		
		textField.setBackground(textfield_color);
		textField.setColumns(30);
		panel_center.add(textField);
		
		
		JPanel panel_north = new JPanel();
		panel_north.setBackground(boton_letra);
		frame.getContentPane().add(panel_north, BorderLayout.NORTH);
		panel_north.setLayout(new GridLayout(0, 3, 0, 0));
		
		JComboBox btnHistorial = new JComboBox();
		btnHistorial.setForeground(panel_sth);
		btnHistorial.setBackground(boton_fondo);
		btnHistorial.setMaximumRowCount(5);
		btnHistorial.setFocusable(false);
		 btnHistorial.addActionListener(new ActionListener() {
	            public void actionPerformed(ActionEvent e) {
	                
	                String selectedOperation = (String) btnHistorial.getSelectedItem();
	                if (selectedOperation != null) {
	                 
	                    textField.setText(selectedOperation);
	                }
	            }
	        });
		 panel_north.add(btnHistorial);
		 
		 ImageIcon icono = new ImageIcon(getClass().getResource("/calculadoraAngles/img/info.png"));
		 Image iconoOriginal = icono.getImage();
		 Image iconoAjustado = iconoOriginal.getScaledInstance(30, 30, Image.SCALE_SMOOTH);
		 ImageIcon iconoFinal = new ImageIcon(iconoAjustado);
		 
		 JButton button_ajuda = new JButton(iconoFinal);
		 button_ajuda.setMinimumSize(new Dimension(40, 40));
		 button_ajuda.setMaximumSize(new Dimension(40, 40));
		 button_ajuda.setPreferredSize(new Dimension(40, 40));
		 button_ajuda.addFocusListener(new FocusAdapter() {
		     @Override
		     public void focusGained(FocusEvent e) {
		         frame.requestFocus();
		     }
		 });
		 button_ajuda.setBackground(boton_fondo);
		 button_ajuda.setForeground(boton_letra);
		 panel_north.add(button_ajuda);

		 Ayuda ayudaFinestra = new Ayuda();  

		 button_ajuda.addActionListener(new ActionListener() {
		     public void actionPerformed(ActionEvent e) {
		         ayudaFinestra.mostrarVentana(); 
		     }
		 });
		 
		
		
		JPanel panel_south = new JPanel();
		panel_south.setBackground(panel_sth);
		frame.getContentPane().add(panel_south, BorderLayout.SOUTH);

		
		JButton button_7 = new JButton("7");
		button_7.setFont(new Font("Dialog", Font.BOLD, 18));
		button_7.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
				
			}
		});
		button_7.setForeground(boton_letra);
		button_7.setBackground(boton_fondo);
		button_7.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"7");
			}
		});
		panel_south.setLayout(new GridLayout(0, 4, 4, 4));
		panel_south.add(button_7);
		
		JButton button_8 = new JButton("8");
		button_8.setFont(new Font("Dialog", Font.BOLD, 18));
		button_8.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_8.setBackground(boton_fondo);
		button_8.setForeground(boton_letra);
		panel_south.add(button_8);
		button_8.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"8");
			}
		});
		
		JButton button_9 = new JButton("9");
		button_9.setFont(new Font("Dialog", Font.BOLD, 18));
		button_9.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_9.setForeground(boton_letra);
		button_9.setBackground(boton_fondo);
		panel_south.add(button_9);
		button_9.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"9");
			}
		});
		
		JButton button_del = new JButton("DEL");
		button_del.setFont(new Font("Dialog", Font.BOLD, 18));
		button_del.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_del.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String currentText = textField.getText();
                if (currentText.length() > 0) {
                    textField.setText(currentText.substring(0, currentText.length() - 1));
                }
			}
		});
		button_del.setBackground(botonT2_fondo);
		button_del.setForeground(boton_fondo);
		panel_south.add(button_del);
		
		JButton button_4 = new JButton("4");
		button_4.setFont(new Font("Dialog", Font.BOLD, 18));
		button_4.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_4.setBackground(boton_fondo);
		button_4.setForeground(boton_letra);
		panel_south.add(button_4);
		button_4.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"4");
			}
		});
		
		JButton button_5 = new JButton("5");
		button_5.setFont(new Font("Dialog", Font.BOLD, 18));
		button_5.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_5.setBackground(boton_fondo);
		button_5.setForeground(boton_letra);
		panel_south.add(button_5);
		button_5.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"5");
			}
		});
		
		JButton button_6 = new JButton("6");
		button_6.setFont(new Font("Dialog", Font.BOLD, 18));
		button_6.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_6.setBackground(boton_fondo);
		button_6.setForeground(boton_letra);
		panel_south.add(button_6);
		button_6.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"6");
			}
		});
		
		JButton button_AC = new JButton("AC");
		button_AC.setFont(new Font("Dialog", Font.BOLD, 18));
		button_AC.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_AC.setBackground(botonT2_fondo);
		button_AC.setForeground(boton_fondo);
		panel_south.add(button_AC);
		button_AC.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText("");
			}
		});
		
		JButton button_1 = new JButton("1");
		button_1.setFont(new Font("Dialog", Font.BOLD, 18));
		button_1.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_1.setBackground(boton_fondo);
		button_1.setForeground(boton_letra);
		panel_south.add(button_1);
		button_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"1");
			}
		});
		
		JButton button_2 = new JButton("2");
		button_2.setFont(new Font("Dialog", Font.BOLD, 18));
		button_2.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_2.setBackground(boton_fondo);
		button_2.setForeground(boton_letra);
		panel_south.add(button_2);
		button_2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"2");
			}
		});
		
		JButton button_3 = new JButton("3");
		button_3.setFont(new Font("Dialog", Font.BOLD, 18));
		button_3.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_3.setBackground(boton_fondo);
		button_3.setForeground(boton_letra);
		panel_south.add(button_3);
		button_3.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"3");
			}
		});
		
		JButton button_mas = new JButton("+");
		button_mas.setFont(new Font("Dialog", Font.BOLD, 18));
		button_mas.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_mas.setBackground(boton_fondo);
		button_mas.setForeground(boton_letra);
		panel_south.add(button_mas);
		button_mas.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"+");
			}
		});
		
		JButton button_dosPuntos = new JButton(":");
		button_dosPuntos.setFont(new Font("Dialog", Font.BOLD, 18));
		button_dosPuntos.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_dosPuntos.setBackground(boton_fondo);
		button_dosPuntos.setForeground(boton_letra);
		panel_south.add(button_dosPuntos);
		button_dosPuntos.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+":");
			}
		});
		
		JButton button_0 = new JButton("0");
		button_0.setFont(new Font("Dialog", Font.BOLD, 18));
		button_0.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_0.setBackground(boton_fondo);
		button_0.setForeground(boton_letra);
		panel_south.add(button_0);
		button_0.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"0");
			}
		});
		
		JButton button_resolver = new JButton("=");
		button_resolver.setFont(new Font("Dialog", Font.BOLD, 18));
		button_resolver.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_resolver.setBackground(boton_fondo);
		button_resolver.setForeground(boton_letra);
		panel_south.add(button_resolver);
		button_resolver.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String operacio = textField.getText();
	        	Calculadora calcul = new Calculadora(operacio,btnHistorial);
	        	calcul.operadorEscollit();
	        	String resultat = calcul.operacioFinal(operacio);
	        	System.out.println(operacio);
	        	textField.setText(resultat);
			}
		});
		
		JButton button_menos = new JButton("-");
		button_menos.setFont(new Font("Dialog", Font.BOLD, 18));
		button_menos.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				frame.requestFocus();
			}
		});
		button_menos.setBackground(boton_fondo);
		button_menos.setForeground(boton_letra);
		panel_south.add(button_menos);
		button_menos.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField.setText(textField.getText()+"-");
			}
		});
		
		
		
		
		
		
		
	
		JSplitPane splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT, panel_center, panel_south);
		splitPane.setForeground(boton_letra);
		splitPane.setDividerSize(5);
		splitPane.setCursor(Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR));
		splitPane.setBackground(boton_letra);
		frame.getContentPane().add(splitPane, BorderLayout.CENTER);
		
		
		
		
		frame.addKeyListener(new KeyAdapter() {
		    @Override
		    public void keyPressed(KeyEvent e) {
		        char keyChar = e.getKeyChar();
		        int keyCode = e.getKeyCode();
		        if (keyChar == '1' || keyChar == '2' || keyChar == '3' || keyChar == '4' || keyChar == '5' || keyChar == '6' || keyChar == '7' || keyChar == '8' || keyChar == '9' || keyChar == '0' || keyChar == '+' || keyChar == '-' || keyChar == ':') {
		            textField.setText(textField.getText() + keyChar);
		        }else if(keyChar == '=' || keyCode == KeyEvent.VK_ENTER) {
		        	String operacio = textField.getText();
		        	Calculadora calcul = new Calculadora(operacio,btnHistorial);
		        	calcul.operadorEscollit();
		        	String resultat = calcul.operacioFinal(operacio);
		        	System.out.println(operacio);
		        	textField.setText(resultat);
		        }
		        if (keyCode == KeyEvent.VK_BACK_SPACE) {
	                String currentText = textField.getText();
	                if (currentText.length() > 0) {
	                    textField.setText(currentText.substring(0, currentText.length() - 1));
	                }
	            }
		    }
		});
		frame.setFocusable(true);
		frame.requestFocus();

	}
	 
	
	

}
