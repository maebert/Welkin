<?

session_start();
date_default_timezone_set('Europe/Berlin');


//--------------------------
// user definable variables:
//--------------------------

// maximum number of seconds user can remain idle without having to re-login:
// use a value of zero for no timeout
$max_session_time = 2;

// type of alert to give on incorrect password:
// eg:
// $alert = "joe@foo.com";	- sends email to joe@foo.com
// $alert = "blah";		- appends to file named 'blah'
// $alert = "";			- no alerts
$alert = "./.ht_badlogins";

// acceptable passwords:
$cmp_pass = Array();
$cmp_pass[] = md5("default");
$cmp_pass[] = md5("another_password");
// add as many as you like

// maximum number of bad logins before user locked out
// use a value of zero for no hammering protection
$max_attempts = 3000;

//-----------------------------
// end user definable variables
//-----------------------------

// save session expiry time for later comparision
$session_expires = $_SESSION['mpass_session_expires'];

// have to do this otherwise max_attempts is actually one less than what you specify.
$max_attempts++;

if(!empty($_POST['mpass_pass']))
{
	// store md5'ed password
	$_SESSION['mpass_pass'] = md5($_POST['mpass_pass']);
}

if(empty($_SESSION['mpass_attempts']))
{
	$_SESSION['mpass_attempts'] = 0;
}

// if the session has expired, or the password is incorrect, show login page:
if(($max_session_time>0 && !empty($session_expires) && mktime()>$session_expires) || empty($_SESSION['mpass_pass']) || !in_array($_SESSION['mpass_pass'],$cmp_pass))
{
	if(!empty($alert) && !in_array($_SESSION['mpass_pass'],$cmp_pass))
	{
		// user has submitted incorrect password
		// generate alert:

		$_SESSION['mpass_attempts']++;
		
		$alert_str = $_SERVER['REMOTE_ADDR']." entered ".htmlspecialchars($_POST['mpass_pass'])." on page ".$_SERVER['PHP_SELF']." on ".date("l dS of F Y h:i:s A")."\r\n";
		
		$extracl = "wobble";
		
		if(stristr($alert,"@")!==false)
		{
			// email alert
			@mail($alert,"Bad Login on ".$_SERVER['PHP_SELF'],$alert_str,"From: ".$alert);
		} else {
			// textfile alert
			$handle = @fopen($alert,'a');
			if($handle)
			{
				fwrite($handle,$alert_str);
				fclose($handle);
			}
		}
	}
	// if hammering protection is enabled, lock user out if they've reached the maximum
	if($max_attempts>1 && $_SESSION['mpass_attempts']>=$max_attempts)
	{
		exit("Too many login failures.");
	}


	// clear session expiry time
	$_SESSION['mpass_session_expires'] = "";

	?>
<html>
<head>
  <title>Enter Password</title>
  <link rel="stylesheet" href="promo.css" />
  <script src="Lib/jquery-1.5.1.min.js"></script>
</head>
<body>
<div class="<?=$extracl2?>" id="promo">
<form action="<?=$_SERVER['PHP_SELF']?>" method="post">

<h1 class="">Enter Alpha Code: <input type="text" name="mpass_pass"></h1>
<input type="submit" value="Login" class="">
</form>
</div>
</body>
</html>
	<?

	// and exit
	exit();
}

// if they've got this far, they've entered the correct password:

// reset attempts
$_SESSION['mpass_attempts'] = 0;

// update session expiry time
$_SESSION['mpass_session_expires'] = mktime()+$max_session_time;

// end password protection code
?>
your protected stuff goes here