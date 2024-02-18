package app;

import java.awt.EventQueue;

import javax.swing.JFrame;
import java.awt.BorderLayout;
import javax.swing.JLabel;
import javax.swing.SwingConstants;
import java.awt.Color;
import javax.swing.JPanel;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import java.awt.GridLayout;
import java.awt.Component;
import java.awt.Rectangle;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.Font;

/*


Java GUI 1: Configuration Page (ConfigPage)

This class creates a configuration window where users can select themes for the application. 
It demonstrates how to use JFrame, JPanel, JButton, and event handling to change application settings based on user input.

    ConfigPage: Sets up a JFrame with a title, background color, and layout. 
	It adds buttons for different themes and a button to return to the main page. 
	Each button has a mouse listener to update the configuration and navigate between pages.

*/

public class ConfigPage {

	private JFrame frame;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ConfigPage window = new ConfigPage();
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
	public ConfigPage() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.getContentPane().setBackground(new Color(119, 118, 123));
		frame.setBackground(new Color(119, 118, 123));
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(new BorderLayout(0, 20));
		
		JLabel lbl_config = new JLabel("CONFIGURACIÓN");
		lbl_config.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
		lbl_config.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
		lbl_config.setBounds(new Rectangle(0, 0, 0, 20));
		lbl_config.setHorizontalAlignment(SwingConstants.CENTER);
		frame.getContentPane().add(lbl_config, BorderLayout.NORTH);
		
		JPanel panel = new JPanel();
		panel.setBounds(new Rectangle(0, 0, 10, 0));
		panel.setAlignmentY(Component.BOTTOM_ALIGNMENT);
		panel.setAutoscrolls(true);
		panel.setBackground(new Color(119, 118, 123));
		frame.getContentPane().add(panel, BorderLayout.CENTER);
		panel.setLayout(new GridLayout(5, 1, 10, 10));
		
		JButton btnNewButton = new JButton("Tema Clasico");
		btnNewButton.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
		btnNewButton.setForeground(new Color(255, 255, 255));
		btnNewButton.setBackground(new Color(61, 56, 70));
		panel.add(btnNewButton);
		btnNewButton.addMouseListener(new MouseAdapter() {
        	@Override
        	public void mouseClicked(MouseEvent e) {
        		Configuracion.tema = "Clasico";
        	}
        });
		
		
		JButton btnNewButton_1 = new JButton("Tema Madera");
		btnNewButton_1.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
		btnNewButton_1.setBackground(new Color(61, 56, 70));
		btnNewButton_1.setForeground(new Color(255, 255, 255));
		panel.add(btnNewButton_1);
		btnNewButton_1.addMouseListener(new MouseAdapter() {
        	@Override
        	public void mouseClicked(MouseEvent e) {
        		Configuracion.tema = "Madera";
        	}
        });
		JButton btnNewButton_2 = new JButton("Tema Fantasia");
		btnNewButton_2.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
		btnNewButton_2.setForeground(Color.WHITE);
		btnNewButton_2.setBackground(new Color(61, 56, 70));
		panel.add(btnNewButton_2);
		 btnNewButton_2.addMouseListener(new MouseAdapter() {
	        	@Override
	        	public void mouseClicked(MouseEvent e) {
	        		Configuracion.tema = "Fantasia";
	        	}
	        });
		
		JButton btnNewButton_3 = new JButton("Volver");
		btnNewButton_3.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
		btnNewButton_3.setForeground(new Color(36, 31, 49));
		btnNewButton_3.setBackground(new Color(255, 255, 255));
		panel.add(btnNewButton_3);
		 btnNewButton_3.addMouseListener(new MouseAdapter() {
	        	@Override
	        	public void mouseClicked(MouseEvent e) {
	        		MainPage mainPage = new MainPage();
	                mainPage.show();
	                frame.dispose();
	        	}
	        });
	}
	public void show() {
        this.frame.setVisible(true);
    }
}
