<?php
/**
 * Created by PhpStorm.
 * User: Qzxtzrtz
 * Date: 9/2/2016
 * Time: 5:01 PM
 */

$baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/";

$searchKey = "recipes/search?cuisine=";
$searchTerm = "italian";
$numberOfResults = "&number=3";
$searchForListUrl = $baseUrl.$searchKey.$searchTerm.$numberOfResults;
$recipeIdArray = [];
$recipeID = "";

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

$data = json_decode(httpGet($searchForListUrl));
$recipeList = $data->{"results"};

foreach($recipeList as $key => $recipe) {
    echo "<br>";
    $recipeID = $recipe->{"id"};
    //echo $recipeID;
    echo "<br> recipeIdArray: <br>";
    array_push($recipeIdArray,$recipeID);
    print_r($recipeIdArray);
    echo "<br><br>";
}

foreach ($recipeList as $index=> $recipe) {
        $recipeID = $recipe->{"id"};
        echo "<br> index = ".$index."<br>";
        print_r( $recipe);
        echo "<br>";
        echo 'recipe->{"id"} = '.$recipe->{"id"}."<br>";
        echo "<br>";
        echo "recipeID = ".$recipeID."<br>";
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
        $searchForInstructionsUrl = $baseUrl.'recipes/'.$recipeID.$instructionsKey;
        $instructionsData = json_decode(httpGet($searchForInstructionsUrl));
        $instructionsData[0]->{'name'} = "OMGWTFBBQ";
        echo "<br> instructionsData: <br>";
        print_r($instructionsData);
        echo "<br> <br>";
        $recipe->{'Ingredients'} = $ingredientsData;
        $recipe->{'Cooking Instructions'} = $instructionsData;
}

echo '<pre>';
//print_r(gettype($data));
//print_r($data);
//print_r(gettype($recipeList));
//print_r($data["[results]"]);

print_r($recipeList);
echo '</pre>';