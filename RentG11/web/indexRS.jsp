<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="java.sql.*"%>
<%@page import="utils.*"%>

<html>
    <head>
        <title>RentG</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/estilo.css">
    </head>
    <body>

        <!-- Cabecera -->
        <header id="header">
            <div class="inner">
                <a href="index.html" class="logo"><strong>RentG</strong>, ¡alquiler de coches!</a>
                <nav id="nav">
                    <%!
                        private Connection con;
                        private Statement set;
                        private ResultSet rs;

                        public void jspInit() {
                            con = BD.getConexion();
                        };
                                             
                    %>     
                    <% String nombre = (String) session.getAttribute("nombre");
                    %>
                    <h1> Hola, <%= nombre%> </h1>
                    <%
                        try {
                            rs.close();
                            set.close();
                        } catch (Exception ex) {
                            System.out.println("Error en acceso a BD" + ex);
                        }
                    %>
                    <a href="busquedaRS.html">Búsqueda</a>
                    <a href="logout.jsp">Logout</a>
                </nav>
                <a href="#navPanel" class="navPanelToggle"><span class="fa fa-bars"></span></a>
            </div>
        </header>

        <!-- Pie de página -->
        <footer id="footer">
            <div class="inner">
                <section class="seccionpie">
                    <address>Vitoria, País Vasco</address>
                    <small>&copy; Derechos Reservados 2018</small>
                </section>
            </div>
        </footer>
    </body>
</html>