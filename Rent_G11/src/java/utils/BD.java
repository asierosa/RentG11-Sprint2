/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author CASA
 */
public class BD {
  private static Connection conn;
        
    public static Connection getConexion(String databaseURL, String user, String password) {
        if (conn == null) {
            try {
                Class.forName("com.mysql.jdbc.Driver");
                conn = DriverManager.getConnection(databaseURL, user, password);
                System.out.println("Se ha conectado.");
            } catch (ClassNotFoundException ex1) {
                System.out.println("No se ha conectado: " + ex1);
            } catch (SQLException ex2) {
                System.out.println("No se ha conectado:" + ex2);
            }
        }
        return conn;
    }
    
     

    public static void destroy() {
        System.out.println("Cerrando conexion...");
        try {
            conn.close();
        } catch (SQLException ex) {
            System.out.println("No se pudo cerrar la conexion");
            System.out.println(ex.getMessage());
        }
    }
}  

