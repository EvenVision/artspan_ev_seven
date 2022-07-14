<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

function ev_seven_preprocess_page(&$vars) {
  $header = drupal_get_http_header("status");
  if ($header == "404 Not Found") {
    $vars['theme_hook_suggestions'][] = 'page__404';
  }
  elseif ($header == "403 Forbidden") {
    $vars['theme_hook_suggestions'][] = 'page__403';
  }
}

function ev_seven_preprocess_html(&$variables) {
  drupal_add_css('https://cloud.typography.com/6777694/7624552/css/fonts.css', array('type' => 'external'));
  $viewport = array(
   '#tag' => 'meta',
   '#attributes' => array(
     'name' => 'viewport',
     'content' => 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes',
   ),
  );
  drupal_add_html_head($viewport, 'viewport');
} 

/**
** Override username function from theme.inc.
** Purpose: Don't truncate usernames over 15 char
**/

function ev_seven_preprocess_username(&$variables) {
   $variables['name'] = $variables['name_raw'];
}