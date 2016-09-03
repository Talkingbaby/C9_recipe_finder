<?php
/**
 * Created by PhpStorm.
 * User: Qzxtzrtz
 * Date: 9/2/2016
 * Time: 5:01 PM
 */

function httpGet($url)
{
    $ch = curl_init();

    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_HTTPGET,true);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
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
}

$jsonData = httpGet("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/22347");

$data = json_decode($jsonData);

echo '<pre>';
print_r($data);
echo '</pre>';
//echo httpGet("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/22347'-H 'X-Mashape-Key: VpQmAeJYO5msh7bVwZT13pUsanqKp1DU33NjsnvQ9KO5VtnlU9");