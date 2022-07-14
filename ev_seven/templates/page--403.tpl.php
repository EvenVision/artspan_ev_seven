<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">

<head>
  <title>403 Access Denied</title>
  <style type="text/css">

    @import url("http://evenvision.com/sites/all/themes/ev_base/css/ev-branded-assets.css");

    body {
      font-family: 'proxima-nova', helvetica, arial, sans-serif;
      font-size: 16px;
      line-height: 1.3;
      background: #eee;
      text-align: center;
    }

  </style>
</head>
<body class="<?php print $classes; ?>">
  <div id="page" class="ev-light utility-page">

    <div id="container" class="clearfix">

      <div id="main" class="column"><div id="main-squeeze">

        <div id="content">
          <div id="content-content" class="clearfix">
            <h1>403 Access Denied</h1>
            <p>You have insufficient permissions. </p>
            <section class="ev-user-form content">
              <?php print $messages; ?>
              <?php print drupal_render(drupal_get_form('user_login')); ?>
              <a href="/user/password" class="ev-reset-link">Forgot your password?</a>
            </section>
            <p><a href="/">← Back to Home</a></p>
          </div> <!-- /content-content -->
        </div> <!-- /content -->

      </div></div> <!-- /main-squeeze /main -->

    </div> <!-- /container -->

  </div> <!-- /page -->

</body>
</html>
