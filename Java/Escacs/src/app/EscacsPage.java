package app;

import javax.swing.*;

import joc.InvalidMovementException;
import joc.MyColor;
import joc.Posicio;
import joc.Tauler;
import peces.Peca;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;


/*

Java GUI 3: Chess Game Page (EscacsPage)

This class implements the graphical interface for a chess game. It initializes a JFrame to display the chessboard, control buttons, and manages the game state.

    EscacsPage: Initializes the game window, sets up a chessboard grid layout, and handles user interactions. 
    It manages the game logic, such as moving pieces and switching turns, and visually updates the board after each move.

*/


/**
 * Classe que implementa l'apartat grafic dels escacs. No es tracta d'una versió completa dels escacs, sino de la part lògica del moviment dels escacs
 */
public class EscacsPage {

    private JFrame frame;
    private JButton[][] botonesCasillas; 
    private Tauler tauler; 
    private Posicio posicioInicialSeleccionada;
    private boolean esperandoMovimiento = false; 
    private MyColor turnoActual = MyColor.BLANC; 
    private JTextField turno;
    private Color colorPanelMenu1;
	private Color colorPanelMenu2;
	private Color frameColor;
	private Color reborde;
	private Color casillasBlancas;
	private Color casillasNegras;

	/**
	 * Inicialitza l'aplicació i mostra la finestra principal. Serveix principalment per a accedir desde la MainPage
	 * @param args
	 */
    public static void main(String[] args) {
    
        EventQueue.invokeLater(() -> {
            try {
                EscacsPage window = new EscacsPage();
                window.frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    /**
     * Constructor que incialitza la part gràfica
     * @wbp.parser.entryPoint
     */
    public EscacsPage() {
        initialize();
    }
    /**
     * Inicialitza els components i configura el tauler i els elements interactius
     */
    private void initialize() {
    	
    	
    	if(Configuracion.tema.equals("Fantasia")) {
    		frameColor = new Color(234,214,166);
        	reborde = new Color(0,0,0);
        	casillasBlancas = new Color(231, 136, 149);
        	casillasNegras = new Color(190, 209, 207);
        	colorPanelMenu1 = new Color(190, 209, 207);
        	colorPanelMenu2 = new Color(231, 136, 149);
        	
        }else if(Configuracion.tema.equals("Madera")) {
        	frameColor = new Color(234,214,166);
        	reborde = new Color(0,0,0);
        	casillasBlancas = new Color(255,238,199);
        	casillasNegras = new Color(68,47,22);
        	colorPanelMenu1 = new Color(32,24,14);
        	colorPanelMenu2 = new Color(251,224,191);
        	
        }else {
        	frameColor = new Color(134,126,126);
        	reborde = new Color(0,0,0);
        	casillasBlancas = Color.WHITE;
        	casillasNegras = Color.GRAY;
        	colorPanelMenu1 = new Color(0,0,0);
        	colorPanelMenu2 = new Color(255,255,255);
        }
    	
    	
        frame = new JFrame("Ajedrez");
        frame.setBackground(frameColor);
        frame.setBounds(100, 100, 800, 800);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().setLayout(new BorderLayout(0, 0));
        
        JPanel panelMenu = new JPanel();
        JButton btn_tornar = new JButton("Volver");
        btn_tornar.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
        JPanel panelTablero = new JPanel();
        
        
        
        
        
        
        
        
        
        panelTablero.setLayout(new GridLayout(8, 8, 0, 0));
        tauler = new Tauler();
        tauler.crearPartida();

        botonesCasillas = new JButton[8][8];
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                JButton botonCasilla = new JButton();
                botonesCasillas[i][j] = botonCasilla;
                botonCasilla.setBorder(BorderFactory.createLineBorder(reborde));
                Color colorCasilla = ((i + j) % 2 == 0) ? casillasBlancas : casillasNegras;
                botonCasilla.setBackground(colorCasilla);
                panelTablero.add(botonCasilla);
                final int finalI = i;
                final int finalJ = j;
                botonCasilla.addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                    	manejarClicCasilla(finalI, finalJ);
                   
                    	
                    	 if(turno.getText().equals("NEGRAS")) {
                    		 
                         	panelMenu.setBackground(colorPanelMenu1);
                         	btn_tornar.setBackground(colorPanelMenu2);
                         	btn_tornar.setForeground(colorPanelMenu1);
                         	turno.setBackground(colorPanelMenu1);
                         	turno.setForeground(colorPanelMenu2);
                         	frame.revalidate();
                         	frame.repaint();
                         }
                         else {
                        	
                         	panelMenu.setBackground(colorPanelMenu2);
                         	btn_tornar.setBackground(colorPanelMenu1);
                         	btn_tornar.setForeground(colorPanelMenu2);
                         	turno.setBackground(colorPanelMenu2);
                         	turno.setForeground(colorPanelMenu1);
                         	frame.revalidate();
                         	frame.repaint();
                         }
                    	
                    }
                });
            }
        }

        
        panelMenu.setBackground(colorPanelMenu2);
        frame.getContentPane().add(panelMenu, BorderLayout.NORTH);
        
       
        btn_tornar.addMouseListener(new MouseAdapter() {
        	@Override
        	public void mouseClicked(MouseEvent e) {
        		MainPage mainPage = new MainPage();
                mainPage.show();
                frame.dispose();
        	}
        });
        btn_tornar.setBackground(colorPanelMenu1);
     	btn_tornar.setForeground(colorPanelMenu2);
        panelMenu.add(btn_tornar);
        
        turno = new JTextField();
        turno.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
        turno.setFocusable(false);
        turno.setText("BLANCAS");
        turno.setEditable(false);
        turno.setBackground(colorPanelMenu2);
        turno.setForeground(colorPanelMenu1);
        panelMenu.add(turno);
        turno.setColumns(10);
        frame.getContentPane().add(panelTablero, BorderLayout.CENTER);
        
        
        
        
        
        
        actualizarTableroGUI();
        
        
        
       
    }
    
    /**
     * Aquest mètode s'encarrega de validar si el click a la casella és valid, de mostrar els moviments possibles i de realitzar-los
     * @param x La coordenada x de la casella
     * @param y La coordenada y de la casella
     */
    private void manejarClicCasilla(int x, int y) {
        Posicio posSeleccionada = new Posicio(x, y);
        Peca pecaEnCasilla = tauler.getPeca(posSeleccionada);

        if (!esperandoMovimiento && pecaEnCasilla != null && pecaEnCasilla.getEquip() == turnoActual) {
            posicioInicialSeleccionada = posSeleccionada;
            esperandoMovimiento = true;
            boolean[][] movimientosPosibles = pecaEnCasilla.movimentsPosibles(tauler);
            resaltarMovimientosPosibles(movimientosPosibles);
        } else if (esperandoMovimiento) {
        	resaltarMovimientosPosibles(new boolean[8][8]);
            try {
                Peca peca = tauler.getPeca(posicioInicialSeleccionada);
                if (peca.movimentsPosibles(tauler)[x][y]) {
                    tauler.mouPeca(posicioInicialSeleccionada, posSeleccionada);
                    actualizarTableroGUI();
                    cambiarTurno();
                   
                    
                } else {
                    throw new InvalidMovementException("Movimiento inválido");
                }
            } catch (InvalidMovementException e) {
                JOptionPane.showMessageDialog(frame, e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            } finally {
                esperandoMovimiento = false;
            }
        }
    }
    /**
     * Aquest mètode s'encarrega de canviar el torn d'entre blanques i negres
     */
    private void cambiarTurno() {
        turnoActual = (turnoActual == MyColor.BLANC) ? MyColor.NEGRE : MyColor.BLANC;
       if(turnoActual == MyColor.NEGRE){
    	   turno.setText("NEGRAS");
    	  
    	   
       }else {
    	   turno.setText("BLANCAS");
       }
    }
   /**
    * Actualitza la part gràfica per mostrar l'actualitat de la partida
    */
    private void actualizarTableroGUI() {
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                JButton botonCasilla = botonesCasillas[i][j];
                Peca peca = tauler.getPeca(new Posicio(i, j));
                if (peca != null) {
                    
                    botonCasilla.setIcon(obtenerIconoPeca(peca));
                } else {
                    botonCasilla.setIcon(null);
                }
            }
        }
    }
    /**
     * Mètode per obtenir la imatge correcte per cada peça del tauler.
     * @param peca la peça de la que es vol canviar la imatge
     * @return la imatge que representa la peça
     */
    private ImageIcon obtenerIconoPeca(Peca peca) {
        String nombrePeca = peca.getClass().getSimpleName();
        MyColor colorPeca = peca.getEquip();
        String color = (colorPeca == MyColor.BLANC) ? "b" : "n";
        String rutaImagen = "src/img/" + nombrePeca.toLowerCase() + "_" + color + ".png";
        return new ImageIcon(rutaImagen);
    }
    /**
     * Mostra la finestra del joc
     */
    public void show() {
        this.frame.setVisible(true);
    }
    /**
     * Resalta les caselles del tauler que representen els moviments possibles de la peça seleccionada.
     * @param movimientosPosibles un array bidimensional que indica els moviments valids
     */
    private void resaltarMovimientosPosibles(boolean[][] movimientosPosibles) {
        for (int i = 0; i < movimientosPosibles.length; i++) {
            for (int j = 0; j < movimientosPosibles[i].length; j++) {
                if (movimientosPosibles[i][j]) {
                    botonesCasillas[i][j].setBackground(new Color(157,255,239));
                } else {
                    
                    Color colorOriginal = ((i + j) % 2 == 0) ? casillasBlancas : casillasNegras;
                    botonesCasillas[i][j].setBackground(colorOriginal);
                }
            }
        }
    }

}
