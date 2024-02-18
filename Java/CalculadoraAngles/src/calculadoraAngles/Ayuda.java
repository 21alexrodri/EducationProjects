package calculadoraAngles;

import java.awt.EventQueue;

import javax.swing.JFrame;
import java.awt.Color;
import javax.swing.JTextField;
import java.awt.BorderLayout;
import javax.swing.JLabel;
import javax.swing.JList;
import java.awt.GridLayout;
import java.awt.Font;


/*

Java GUI 1: Help Window

This section of code initializes a JFrame to display help information about using a degree calculator application. 
It utilizes a grid layout to organize text labels, which provide instructions on how to use the calculator correctly.

    Ayuda: A class that encapsulates the creation of a help window (JFrame). It sets up the window with a specific background color 
    and layout and adds multiple labels (JLabel) with instructions for the user.

*/
public class Ayuda {

    private JFrame frame;

    public Ayuda() {
        initialize();
    }

    private void initialize() {
        frame = new JFrame();
        frame.getContentPane().setBackground(new Color(230, 223, 213));
        frame.getContentPane().setLayout(new GridLayout(0, 1, 0, 0));
        frame.setMinimumSize(new java.awt.Dimension(450,200));
        
        JLabel lblAjuda = new JLabel("Aquesta és una calculadora de graus.  Per fer-la servir correctament:");
        lblAjuda.setFont(new Font("Dialog", Font.BOLD, 12));
        lblAjuda.setForeground(new Color(54, 38, 15));
        lblAjuda.setBackground(new Color(230, 223, 213));
        frame.getContentPane().add(lblAjuda);
        
        JLabel lbl_txt_list = new JLabel("-Separar els valors per : (exemple 10:10:10)");
        lbl_txt_list.setFont(new Font("Dialog", Font.PLAIN, 12));
        lbl_txt_list.setForeground(new Color(54, 38, 15));
        frame.getContentPane().add(lbl_txt_list);
        
        JLabel lbl_text_list2 = new JLabel("-No posar valors negatius");
        lbl_text_list2.setFont(new Font("Dialog", Font.PLAIN, 12));
        frame.getContentPane().add(lbl_text_list2);
        
        JLabel lbl_text_list3 = new JLabel("-Els valors es donen per GRAUS:MINUTS:SEGONS");
        lbl_text_list3.setFont(new Font("Dialog", Font.PLAIN, 12));
        frame.getContentPane().add(lbl_text_list3);
        
        JLabel lbl_text_list4 = new JLabel("-Posar només un valor ex. 34, comptarà com a segons, (00:00:34)");
        lbl_text_list4.setFont(new Font("Dialog", Font.PLAIN, 12));
        frame.getContentPane().add(lbl_text_list4);
        frame.setBounds(100, 100, 450, 300);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    }

    public void mostrarVentana() {
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    frame.setVisible(true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}