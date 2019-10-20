<div class="external_fields">
  <div class="external-field-name"><?php print $key; ?></div>
  <?php if (isset($normal_link)): ?>
    <div class="add-content-to-field"> <?php print $normal_link; ?> </div>
  <?php endif; ?>
  <?php if (isset($reference_link)): ?>
    <div class="add-reference-content-to-field"> <?php print $reference_link; ?> </div>
  <?php endif; ?>
  <div class="external-field-value" title=<?php print strip_tags($value); ?> ><?php print $truncated_value; ?></div>
  <div class="external-data-content-to-fill hidden"><?php print $value; ?></div>
</div>
