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
                <a href="index.jsp" class="logo">Volver</a> 
                <a href="#navPanel" class="navPanelToggle"><span class="fa fa-bars"></span></a>
            </div>
        </header>

        <!-- Centro -->
        <%
            try {
               session.invalidate();

        } catch (Exception ex) {
            System.out.println("Error en el logout" + ex);
        }
    %>
    <h1>Logout realizado.</h1>
</div>
</section>

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