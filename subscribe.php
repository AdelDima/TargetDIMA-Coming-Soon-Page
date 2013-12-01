<?php 

/*
 * -----------------------------------------------------------------------------
 * The script can work in mode: txt 
 * The script saves emails to the file "emails.txt" .
 * -----------------------------------------------------------------------------
 */
	      if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		    exit;
	       }

			$FileOp = fopen('emails.csv', 'a');
		
			if ($FileOp) {
				$emails = file('emails.csv');					
				$inList = false;
				$i = 1;
				//check if email in list
				foreach($emails as $k => $v) {
				    $i++;	
					$email = explode(',', $v);
					if ($_POST['email'] == $email[1]) {
						$inList = true;
						break;
					}
				}
					
				if (!$inList) {
					$Server_IP  = $_SERVER['SERVER_ADDR'];
					$emails =$_POST['email'];
					fputcsv($FileOp,
					               array($i,
					               	$emails, 
					               	$Server_IP)
					 );
					fclose($FileOp);				
				}
			}
