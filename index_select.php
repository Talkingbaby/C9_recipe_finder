<!-- index_select.php -->
<?php
require_once('mysql_connect.php');
//$query = "UPDATE `recipe_master` set `ready_in_minutes` = 30 WHERE id = 1";
$query = "SELECT * FROM `recipe_master`";
$result = mysqli_query($conn, $query);

if(!empty($result) && mysqli_num_rows($result)>0){
    print('results!');
    while($single_row = mysqli_fetch_assoc($result)){
        print('<pre>');
        print(print_r($single_row,true));
        print('<pre>');
    }
}
?>
<!--print('affected rows '.mysqli_affected_rows($conn));-->
<!--if(mysqli_affected_rows($conn) > 0) {-->
<!--        print('<br>table updated!');-->
<!---->
<!-- }elseif (mysqli_affected_rows($conn) == -1){-->
<!--        print('bad query : '. mysqli_error($conn));-->
<!-- } else {-->
<!--        print('<br>table not updated! try again');-->
<!-- }-->
<!-- ?>-->

