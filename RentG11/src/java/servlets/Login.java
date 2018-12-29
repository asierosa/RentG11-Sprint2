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

        if ("RS1@rentG.com".equals(emailLog) || "RS2@rentG.com".equals(emailLog) || "RS3@rentG.com".equals(emailLog)) {

            try {
                
                boolean existe = false;
                PreparedStatement ps = con.prepareStatement("select * from responsableoficina where Usuario=? and Contraseña=?");
                ps.setString(1, emailLog);
                ps.setString(2, pass);
                ResultSet rs = ps.executeQuery();
                existe = rs.next();
                if (existe) {
                    s.setAttribute("usuario", rs.getString("Usuario"));
                    req.getRequestDispatcher("indexRS.jsp").forward(req, res);
                }

                
            } catch (SQLException ex1) {
                System.out.println("Email o contraseña incorrectos" + ex1);
            }
        } 
        else {
            try {
               boolean existe = false;
                PreparedStatement ps = con.prepareStatement("select * from cliente where Email=? and Contraseña=?");
                ps.setString(1, emailLog);
                ps.setString(2, pass);
                ResultSet rs = ps.executeQuery();
                existe = rs.next();

                if (existe) {
                    s.setAttribute("nombre", rs.getString("Nombre"));
                    req.getRequestDispatcher("indexCliente.jsp").forward(req, res);
                }
                rs.close();
                
            } catch (SQLException ex1) {
                System.out.println("Email o contraseña incorrectos" + ex1);
            }
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
