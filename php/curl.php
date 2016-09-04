<?php
session_start();
/**
 * Created by PhpStorm.
 * User: Qzxtzrtz
 * Date: 9/2/2016
 * Time: 5:01 PM
 */
//require_once("credentials.php");

$_POST['cuisine'] = 'mexican';
$_POST['cookTime'] = 15;
//$_POST['cookTime_upper'] = 15;
//$_POST['cookTime_lower'] = 0;

$baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/";

$searchKey = "recipes/search?cuisine=";
$searchTerm = $_POST['cuisine'];
$searchTime = $_POST['cookTime'];
//$searchTime_upper = $_POST['cookTime_upper'];
//$searchTime_lower = $_POST['cookTime_lower'];
$numberOfResults = "&number=10";
$searchForListUrl = $baseUrl.$searchKey.$searchTerm.$numberOfResults;
$recipeIdArray = [];
//$recipeID = "";
$instructionsKey = "/analyzedInstructions?stepBreakdown=true";


function httpGet($url)
{
    $ch = curl_init();

    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_HTTPGET,true);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);   //return the transfer as a string of the return value of curl_exec()
                                                    // instead of outputting it directly
    curl_setopt($ch, CURLOPT_HEADER, false);        //do not return header
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);    //get around https check
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("X-Mashape-Key: "."VpQmAeJYO5msh7bVwZT13pUsanqKp1DU33NjsnvQ9KO5VtnlU9"));

    $output=curl_exec($ch);
    $error = curl_error($ch);

    if(!empty($error)){
        echo '<pre>';
        print_r($error);
        echo '</pre>';
    }
    curl_close($ch);
    return $output;
};
echo $searchForListUrl;
$data = json_decode(httpGet($searchForListUrl));
$recipeList = $data->{"results"};
foreach($recipeList as $key => $recipe) {
    echo "<br>";
    $recipeID = $recipe->{"id"};
    $recipeTime = $recipe->{"readyInMinutes"};
    if($searchTime >= $recipeTime) {

        echo "recipeTime = " . $recipeTime;
        echo "<br>";
        echo "searchTime = " . $searchTime;
        echo "<br>";
        echo '$searchTime >= $recipeTime';
        echo "<br>pushing to recipeIdArray: <br>";
        array_push($recipeIdArray, $recipeID);
        print_r($recipeIdArray);
        echo "<br><br>";

        echo "<br> index = " . $key . "<br>";
        print_r($recipe);
        echo "<br>";
        echo 'recipe->{"id"} = ' . $recipe->{"id"} . "<br>";
        echo "<br>";
        echo "recipeID = " . $recipeID . "<br>";
        echo "<br>";
        $searchForIngredientsUrl = $baseUrl . "recipes/" . $recipeID . "/information?includeNutrition=false";
        $ingredientsData = json_decode(httpGet($searchForIngredientsUrl));
        //unset($ingredientsData->{"id"});
        unset($ingredientsData->{"title"});
        unset($ingredientsData->{"readyInMinutes"});
        unset($ingredientsData->{"image"});
        echo "<br> ingredientsData: <br>";
        print_r($ingredientsData);
        echo "<br> <br>";
        $searchForInstructionsUrl = $baseUrl . 'recipes/' . $recipeID . $instructionsKey;
        $instructionsData = json_decode(httpGet($searchForInstructionsUrl));
        $instructionsData[0]->{'name'} = "OMGWTFBBQ";
        echo "<br> instructionsData: <br>";
        print_r($instructionsData);
        echo "<br> <br>";
        $recipe->{'Ingredients'} = $ingredientsData;
        $recipe->{'Cooking Instructions'} = $instructionsData;
    }
    else {
        unset($recipeList->$recipe); ///WORK ON THIS
    }
}

echo '<pre>';
echo "<br>";
echo "recipeList: <br>";
print_r($recipeList);
echo '</pre>';