<!-- index_select.php -->
<?php
require_once('mysql_connect.php');

//print_r($_POST['data']['results']);
$result_array = $_POST['data']['results'];
//print_r($result_array);
$source = "'spoon-liz'";
$tags = "'test'";
foreach($result_array as $recipe_array){
    print('***************in the index_select.php script************'."\n");
    $id = $recipe_array['id'];
    print('id is '.$id."\n");
    $title = "'".mysqli_real_escape_string($conn, $recipe_array['title'])."'";
    print($title."\n");
//    $image = urlencode($recipe_array['image']);
    $image = "'".$recipe_array['image']."'";
    print('image is '.$image."\n");

    print('***************in the index_select.php script************'."\n");


    $query = "INSERT INTO `recipe_master` (source, spoonacular_recipe_id, tags, title, image) VALUES ($source, $id, $tags, $title, $image)";
    print($query);
    $result = mysqli_query($conn, $query);
    print('affected rows '.mysqli_affected_rows($conn)."\n");
    if(mysqli_affected_rows($conn) > 0) {
        print("table updated!"."\n");
    } elseif (mysqli_affected_rows($conn) == -1){
        print('bad query : '. mysqli_error($conn)."\n");
    } else {
        print('table not updated! try again'."\n");
    }
}

?>