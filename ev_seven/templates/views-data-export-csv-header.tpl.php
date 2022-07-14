<?php

// Print out header row, if option was selected.
if ($options['header']) {
	// Begins output file with a UTF-8 BOM, so the file can properly display accent characters
	print "\xEF\xBB\xBF";
	print implode($separator, $header) . "\r\n";
}
