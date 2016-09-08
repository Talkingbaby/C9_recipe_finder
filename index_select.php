<!-- index_select.php -->
<?php
require_once('mysql_connect.php');
 
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