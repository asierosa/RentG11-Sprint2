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
        <script src="js/reserva.js" type="text/javascript"></script>
    </head>
    <body>

        <!-- Cabecera -->
        <header id="header">
            <div class="inner">
                <a href="index.jsp" class="logo"><strong>RentG</strong>, ¡alquiler de coches!</a>
                <nav id="nav">
                    <a href="registro.html">Registro</a>
                    <a href="login.html">Login</a>
                </nav>
                <a href="#navPanel" class="navPanelToggle"><span class="fa fa-bars"></span></a>
            </div>
        </header>

        <!-- Centro -->
        <section id="banner">
            <div class="inner">
                <header>
                    <h1>Realiza un alquiler de coche</h1>
                </header>

                <div class="flex ">

                    <div>
                        <span ></span>
                        <form name="frmAlquiler" id="frmAlquiler" method="get" action="login.html">
                            <p>Elige un coche </p>
                            <select name="lCoches" id="coches" size="6" required="">
                                <%!
                                    private Connection con;
                                    private Statement set;
                                    private ResultSet rs;

                                    public void jspInit() {
                                        con = BD.getConexion();
                                    };                         
                                %>
                                <%
                                    try {
                                        String matricula = null;
                                        String sucursal = null;
                                        String modelo = null;
                                        set = con.createStatement();
                                        rs = set.executeQuery("SELECT * FROM coche");
                                        while (rs.next()) {
                                            matricula = rs.getString("Matricula");
                                            sucursal = rs.getString("SucursalOrigen");
                                            modelo = rs.getString("Modelo");                                                                                 
                                %>
                                <option value="<%=matricula%>"><%=sucursal%><%=modelo%></option>
                            <%
                                    }
                                    rs.close();
                                    set.close();
                                }
                                catch (Exception ex) {
                                    System.out.println("Error en acceso a BD" + ex);
                                }
                            %>
                              </select>
                            <p>Fecha de inicio:
                            <p></p>
                            <input type="date" name="fechaI" id="fechaI" required=""/>
                            <p>Hora de inicio:
                            <p></p>
                            <input type="time" name="horaI" id="horaI" required=""/>
                            <p>Fecha de fin:
                            <p></p>
                            <input type="date" name="fechaF" id="fechaF" required=""/>
                            <p>Hora de fin:
                            <p></p>
                            <input type="time" name="horaF" id="horaF" required="" />
                            <p>Ciudad de recogida:
                            <p></p>
                            <select name="lCiudad" id="ciudad" size="3" required="">
                                <option value="Vitoria">Vitoria</option>
                                <option value="Donosti">Donosti</option>
                                <option value="Bilbao">Bilbao</option>
                            </select>
                            <h3>-------</h3>
                            <p><button type="submit" class="button" id="enviar">Alquilar</button></p>    
                        </form>
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