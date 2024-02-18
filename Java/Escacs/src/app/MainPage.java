package app;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;

import javax.swing.JLabel;
import javax.swing.SwingConstants;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.GraphicsEnvironment;
import java.awt.Color;
import javax.swing.JButton;

/*

Java GUI 4: Main Page (MainPage)

The entry point of the application, creating a welcoming window from which users can navigate to either start a new game or adjust settings.

    MainPage: Sets up the main window of the application with buttons to play the game or go to the configuration page. 
	It demonstrates font management, window layout, and button action handling.


*/
public class MainPage {

	private JFrame frame;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					MainPage window = new MainPage();
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
	public MainPage() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		try {
		Font titolCustom = Font.createFont(Font.TRUETYPE_FONT, new File("src/fuentes/Caramel.ttf")).deriveFont(62f);
		GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
        ge.registerFont(titolCustom);
        
        Font numeroCustom = Font.createFont(Font.TRUETYPE_FONT, new File("src/fuentes/CuteNotes.ttf")).deriveFont(82f);
        ge.registerFont(numeroCustom);
        JPanel panel = new JPanel();
		panel.setBackground(new Color(134, 126, 126));
		frame.getContentPane().add(panel, BorderLayout.NORTH);
		panel.setLayout(new GridLayout(2, 0, 0, 0));
		
		JLabel Label_ajedrez = new JLabel("Ajedrez");
		Label_ajedrez.setFont(titolCustom);
		Label_ajedrez.setHorizontalAlignment(SwingConstants.CENTER);
		panel.add(Label_ajedrez);
		
		JLabel Label_2 = new JLabel("2");
		Label_2.setFont(numeroCustom);
		Label_2.setHorizontalAlignment(SwingConstants.CENTER);
		panel.add(Label_2);
		
		JPanel panel_1 = new JPanel();
		panel_1.setBackground(new Color(134, 126, 126));
		frame.getContentPane().add(panel_1, BorderLayout.CENTER);
		panel_1.setLayout(new GridLayout(2, 0, 0, 0));
		
		JLabel label_vacia1 = new JLabel("");
		label_vacia1.setBackground(new Color(249, 240, 107));
		panel_1.add(label_vacia1);
		
		JButton btnJugar = new JButton("Jugar");
		btnJugar.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
		btnJugar.setForeground(new Color(255, 255, 255));
		btnJugar.setBackground(new Color(61, 56, 70));
		panel_1.add(btnJugar);
		btnJugar.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				EscacsPage escacsPage = new EscacsPage();
                escacsPage.show();
                frame.dispose();
				
			}
        });
		
		JLabel label_vacia2 = new JLabel("");
		label_vacia2.setForeground(new Color(249, 240, 107));
		label_vacia2.setBackground(new Color(249, 240, 107));
		panel_1.add(label_vacia2);
		
		JLabel label_vacia4 = new JLabel("");
		panel_1.add(label_vacia4);
		
		JButton btnOpcions = new JButton("Configuración");
		btnOpcions.setFont(new Font("Nimbus Sans Narrow", Font.BOLD, 18));
		btnOpcions.setForeground(new Color(255, 255, 255));
		btnOpcions.setBackground(new Color(61, 56, 70));
		panel_1.add(btnOpcions);
		btnOpcions.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				ConfigPage configPage = new ConfigPage();
                configPage.show();
                frame.dispose();
				
			}
        });
		
		JLabel label_vacia3 = new JLabel("");
		panel_1.add(label_vacia3);
		}catch(IOException | FontFormatException e) {
			e.printStackTrace();
		};
		
	}
	public void show() {
        this.frame.setVisible(true);
    }
}
