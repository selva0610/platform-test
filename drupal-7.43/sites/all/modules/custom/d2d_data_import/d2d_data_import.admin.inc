<?php

/**
 * @file
 * The admin file containing the menu callback function.
 */

/**
 * Menu callback to display the solr options admin form.
 */
function external_search_details_form() {
  $rows =array();
  $query = db_select('search_external_settings', 'ses');
  $query->fields('ses', array('brand_name', 'url'));
  $result = $query->execute()->fetchAll();
  $header = array('Brand Title', 'URL');
  foreach ($result as $key => $value) {
    $rows[] = array($value->brand_name, $value->url);
  }
  $existing_rows = theme('table', array('header' => $header, 'rows' => $rows));
  $form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Enter Brand Title'),
    '#required' => TRUE,
    '#prefix' => $existing_rows . '<div class="external-server-field"><span>',
  );
  $form['search_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Enter Brand Search URL'),
    '#required' => TRUE,
    '#prefix' => '</span><span>',
    '#suffix' => '</span></div>',
    '#rows'  => 60,
  );
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Submit',
  );

  return $form;
}

/**
 * hook_form_submit
 */
function external_search_details_form_submit($form, &$form_state) {
  if ($form_state['input']['op'] == 'Submit') {
    $title = $form_state['input']['title'];
    $url = $form_state['input']['search_url'];
    $ping = apachesolr_server_status($url);
    if ($ping) {
      drupal_set_message(t('Successfully added.'));
      db_insert('search_external_settings')
      ->fields(array(
        'brand_name' => $title,
        'url' => $url,
      ))
      ->execute();
    }
    else {
      drupal_set_message(t('Your site was unable to contact the Apache Solr server.'), 'error');
    }
    $form_state['rebuild'] = TRUE;
  }
}