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
        ServletContext contexto = cfg.getServletContext();
        
        String IP = contexto.getInitParameter("IP");
        String database = contexto.getInitParameter("BD");
        String URL = "jdbc:mysql://"+ IP + "/" + database;
    
        String userName = contexto.getInitParameter("user");
        String password = contexto.getInitParameter("password");
        
        con = BD.getConexion(URL,userName,password);
    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        // Obtener la sesion
        HttpSession s = req.getSession(true);
        // Guardar el nombre del cliente en la sesión
        // para poderlo utilizar en el siguiente servlet
        String nombreC = (String) req.getParameter("txtNombre");
        s.setAttribute("nombreCliente", nombreC);
        String nombre = (String) req.getParameter("R1");
        if (nombre.equals("Otros")) {
            nombre = (String) req.getParameter("txtOtros");
        }
        boolean existe = false;
        try {
            set = con.createStatement();
            rs = set.executeQuery("SELECT * FROM Jugadores");
            while (rs.next()) {
                cad = rs.getString("Nombre");
                cad = cad.trim();
                if (cad.compareTo(nombre.trim()) == 0) {
                    existe = true;
                }
            }
            rs.close();
            set.close();
        } catch (SQLException ex1) {
            System.out.println("No lee de la tabla Jugadores. " + ex1);
        }
        try {
            set = con.createStatement();
            if (existe) {
                set.executeUpdate("UPDATE Jugadores SET votos=votos+1 "
                        + "WHERE nombre LIKE '%" + nombre + "%'");
            } else {
                set.executeUpdate("INSERT INTO Jugadores "
                        + "(nombre,votos) VALUES ('" + nombre + "',1)");
            }
            rs.close();
            set.close();
        } catch (SQLException ex2) {
            System.out.println("No inserta ni modifica la tabla Jugadores." + ex2);
        }
        // Otra ejecución:
        // Llamada al jsp que nos visualiza
        // las estadísticas de jugadores
        //res.sendRedirect("TablaVotos.jsp");
        req.getRequestDispatcher("TablaVotos.jsp").forward(req, res);
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