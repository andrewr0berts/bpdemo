<span id="footerText">Copyright Andrew Roberts (C) 2017</span>
<span id="userInfo">
    <?php
        if(isset($_SESSION['userName']))
        {
            echo "(". $_SESSION['userName']. "@". $_SESSION['custName']. ")";
        }    
    ?>
</span>

<a href="http://www.bpdemo.com/adminControl.php" target="_blank">
    <span id="myLogo"></span>
</a>