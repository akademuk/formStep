<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = $_POST['g-recaptcha-response'];
    $secret_key = '6Le4GEUlAAAAAHLhFz4Fyb6VIDH1qAd19u3CIuOt';
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => $secret_key,
        'response' => $response
    );
    $options = array(
        'http' => array (
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $success = json_decode($result)->success;

    if ($success) {
        // Set the recipient email address
        $to = 'akademuk24@gmail.com';

        // Set the Telegram bot API key and chat ID
        $telegramApiKey = '5995280641:AAHDBaUH2b9TLM8tOmVOnsnzv79_8a8rrsk';
        $telegramChatId = '-1001830660169';

        // Get the form data
        $purposePurchase = $_POST['purposePurchase'];
        $typeOfRealEstate = $_POST['typeOfRealEstate'];
        $planning = $_POST['planning'];
        $budget = $_POST['budget'];
        $credit = $_POST['credit'];
        $term = $_POST['term'];
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $contactMethod = $_POST["contact-method"];


        $purposePurchase = isset($_POST['purposePurchase']) ? $_POST['purposePurchase'] : 'Извине нет данных';
        $typeOfRealEstate = isset($_POST['typeOfRealEstate']) ? $_POST['typeOfRealEstate'] : 'Извине нет данных';
        $planning = isset($_POST['planning']) ? $_POST['planning'] : 'Извине нет данных';
        $budget = isset($_POST['budget']) ? $_POST['budget'] : 'Извине нет данных';
        $credit = isset($_POST['credit']) ? $_POST['credit'] : 'Извине нет данных';
        $term = isset($_POST['term']) ? $_POST['term'] : 'Извине нет данных';


        // Set the email subject and message
        $subject = 'Form Submission';
        $message = "Ім'я: $name\n Телефон: $phone\n Як зв'язатися: $contactMethod\n З якою метою плануєте купівлю нерухомості?: $purposePurchase\n Оберіть тип нерухомості, який вас цікавить: $typeOfRealEstate\n Оберіть відповідне планування: $planning\n На який бюджет розраховуєте? $budget\n Чи потрібна росрочка чи кредит?: $credit\n У який срок плануєте купувати нерухомість?: $term";

        // Send the email
        mail($to, $subject, $message);

        // Set the Telegram message
        $telegramMessage = urlencode("Ім'я: $name\n Телефон: $phone\n Як зв'язатися: $contactMethod\n З якою метою плануєте купівлю нерухомості?: $purposePurchase\n Оберіть тип нерухомості, який вас цікавить: $typeOfRealEstate\n Оберіть відповідне планування: $planning\n На який бюджет розраховуєте? $budget\n Чи потрібна росрочка чи кредит?: $credit\n У який срок плануєте купувати нерухомість?: $term");


        // Send the Telegram message
        $telegramUrl = "https://api.telegram.org/bot$telegramApiKey/sendMessage?chat_id=$telegramChatId&text=$telegramMessage";
        file_get_contents($telegramUrl);

        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit();
    }
?>
