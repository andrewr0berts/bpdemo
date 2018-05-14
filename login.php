<?php
    if(isset($_SESSION))
    {
        $_SESSION = [];
        session_destroy();
    }
    session_start();
    error_reporting(E_ALL);
    ini_set('display_errors', True);
    
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/constants.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/dbHandler.php';
    
    date_default_timezone_set('Australia/Melbourne');
?>

<!DOCTYPE html>

<html>
    <head>
        <?php include $_SERVER['DOCUMENT_ROOT'].'/common/commonHead.php'; ?>
        <script src="js/login.js"></script>
    </head>
    <body>
             
        <!--Top of window banner-->
        <div class="headerDiv">
            <?php include_once "common/header.php"; ?>
        </div>

        <!--Title of window function-->
        <div >
            <h1>Login</h1>
        </div>

        <!--Main login window-->
        <div class="loginDiv">
            <form id="loginform" method="post">
                <h2 id="loginText">Select a user:</h2>
                <div id=user1div class="usercont"><div class="user user1" id="user1"></div>Mobile User</div>
                <div id=user2div class="usercont"><div class="user user2" id="user2"></div>Business User</div>
                <div id=user3div class="usercont"><div class="user user3" id="user3"></div>Admin</div>
                <input type="hidden" name="username" value="" id="username" autocomplete="off">
                <div id="passwordSlider">
                    <label class="loginLabel" for="password">Password</label>
                    <input class="narrow" type="password" name="password" value="" id="password" autocomplete="off">
                    <div id="loginButtons">
                        <input type="submit" id="loginButton" value="Login"/>
                        <input type="cancel" id="cancelButton" value="Cancel"/>
                    </div>
                </div>
                <div id="spinner"></>
            </form>
        </div>


        <!--Footer section-->
        <div class="footerDiv">
            <?php include_once "common/footer.php"; ?>
        </div>
            
    </body>
</html>