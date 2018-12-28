/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import utils.BD;

/**
 *
 * @author CASA
 */
public class Registro extends HttpServlet {

    private Connection con;
    private Statement set;
    private ResultSet rs;
    String cad;

    @Override
    public void init(ServletConfig cfg) throws ServletException {
        ServletContext contexto = cfg.getServletContext();

        String IP = contexto.getInitParameter("IP");
        String database = contexto.getInitParameter("BD");
        String URL = "jdbc:mysql://" + IP + "/" + database;

        String userName = contexto.getInitParameter("user");
        String password = contexto.getInitParameter("password");

        con = BD.getConexion(URL, userName, password);
    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        // Obtener la sesion
        HttpSession s = req.getSession(true);
        // Guardar el nombre del cliente en la sesión
        // para poderlo utilizar en el siguiente servlet
        String email = (String) req.getParameter("email");
        String nombre = (String) req.getParameter("name");
        String DNI = (String) req.getParameter("DNI");
        String telefono = (String)req.getParameter("tfn");
        String contrasena =(String) req.getParameter("txtPasword");
        String foto = (String) req.getParameter("");
        s.setAttribute("nombreCliente", nombre);
        s.setAttribute("fotoCliente", foto);
        
       
        try {
            set= con.createStatement();
            set.executeUpdate("INSERT INTO cliente VALUES ('"+email+"','"+nombre+"','"+DNI+"','"+telefono+"','"+contrasena+"','"+foto+"')");

            rs.close();
            set.close();
        } catch (SQLException ex2) {
            System.out.println("No inserta el usuario en Cliente." + ex2);
        }
        
        req.getRequestDispatcher("Busqueda.jsp").forward(req, res);
    }

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        try {
            doPost(req, res);
        } catch (IOException | ServletException e) {
        }
    }

}
