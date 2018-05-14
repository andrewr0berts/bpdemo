<html>
    <body>
        <table id="HdrTable">
            <tr>
                <td id="LeftLogoHdr"></td>
                <td id="apptitle">
                    <?php
                        if(isset($_SESSION['AppName']))
                        {
                            echo $_SESSION['AppName'];
                        } else
                        {
                            echo "Service Manager";
                        }
                    ?>
                </td>
                <td id="RightLogoHdr"></td>
            </tr>      
        </table>
    </body>
</html>