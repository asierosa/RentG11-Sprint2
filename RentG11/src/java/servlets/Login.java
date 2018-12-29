package servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import utils.BD;

public class Login extends HttpServlet {

    private Connection con;
    private Statement set;
    private ResultSet rs;
    String cad;

    @Override
    public void init(ServletConfig cfg) throws ServletException {
        con = BD.getConexion();
    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        // Obtener la sesion
        HttpSession s = req.getSession(true);
        // Guardar el nombre del cliente en la sesión
        // para poderlo utilizar en el siguiente servlet
        String emailLog = (String) req.getParameter("emailLogin");
        s.setAttribute("email", emailLog);
        String pass = (String) req.getParameter("txtPassLogin");

        boolean existe = false;
        try {
            set = con.createStatement();
            rs = set.executeQuery("SELECT * FROM cliente");
            while (rs.next()) {
                cad = rs.getString("Email");
                cad = cad.trim();
                if (cad.compareTo(emailLog.trim()) == 0) {
                    existe = true;
                }
            }
            rs.close();
            set.close();
        } catch (SQLException ex1) {
            System.out.println("No lee de la tabla Cliente. " + ex1);
        }
        try {
            set = con.createStatement();
            if (existe) {

                boolean contr = false;
                try {
                    set = con.createStatement();
                    String select = "SELECT * FROM cliente where Email like " + emailLog;
                    rs = set.executeQuery(select);
                    while (rs.next()) {
                        cad = rs.getString("Constraseña");
                        cad = cad.trim();
                        if (cad.compareTo(pass.trim()) == 0) {
                            contr = true;
                        }
                    }
                    rs.close();
                    set.close();
                } catch (SQLException ex1) {
                    System.out.println("No lee de la tabla Cliente. " + ex1);
                }
                if (contr) {

                    if (emailLog != "RS1@rentG.com" || emailLog != "RS2@rentG.com" || emailLog != "RS3@rentG.com") {
                        req.getRequestDispatcher("indexCliente.jsp").forward(req, res);
                    } else {
                        req.getRequestDispatcher("indexRS.jsp").forward(req, res);
                    }
                }
                
                else{
                    System.out.println("La contraseña es incorrecta.");
                }

            } else {
                System.out.println("No existe en la BD el email indicado.");
            }
            rs.close();
            set.close();
        } catch (SQLException ex2) {
            System.out.println(ex2);
        }

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
