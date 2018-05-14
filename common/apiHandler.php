<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/common/constants.php';

$response_array = array();

//curl -k -H "Content-Type:application/json" -d '{"username":"admin","password":"adminpw"}' https://<server_IP>/tron/api/v1/tokens

function get_headers_from_curl_response($response)
{
    $headers = array();
    $header_text = substr($response, 0, strpos($response, "\r\n\r\n"));

    foreach (explode("\r\n", $header_text) as $i => $line)
        if ($i === 0)
            $headers['http_code'] = $line;
        else
        {
            list ($key, $value) = explode(': ', $line);
            $headers[$key] = $value;
        }
    return $headers;
}

function getToken()
{
    $response_array = array();
    $url = "https://".$_SESSION["BPServerAddr"]."/tron/api/v1/tokens";
    $cmd = '{"username":"admin","password":"adminpw"}';

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => array('Content-type: application/json'),
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 1,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_POSTFIELDS => $cmd,
        CURLOPT_URL => $url
        ));
    
    $resp = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $response_array['code'] = $httpCode;
    if( $httpCode <> 201 )
    {
        $response_array['status'] = "ERROR (HTTP_CODE=".$httpCode.")";
        $response_array['info'] = $resp;
        $response_array['more'] = curl_error($curl);
    }
    else
    {
        $headers = get_headers_from_curl_response($resp);
        $response_array['status'] = SUCCESS;
        $response_array['info'] = $resp;
        $response_array['headers'] = $headers;
        
    }
    curl_close($curl);
    return $response_array;
}

function getPortID($token, $node, $port)
{
    $response_array = array();
    $url = "https://".$_SESSION["BPServerAddr"]."/bpocore/market/api/v1/resources?resourceTypeId=raciena6x.resourceTypes.Interface&q=properties.".$port.",properties.hostname:".$node;

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            'accept: application/json',
            'Authorization: Token '.$token)
        ));
    
    $resp = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if( $httpCode <> 200 )
    {
        $response_array['status'] = "ERROR (HTTP_CODE=".$httpCode.")";
        $response_array['info'] = $resp;
        $response_array['more'] = curl_error($curl);
    }
    else
    {
        $headers = get_headers_from_curl_response($resp);
        $response_array['status'] = SUCCESS;
        $response_array['info'] = $resp;
        $response_array['headers'] = $headers;
        
    }
    curl_close($curl);
    return $response_array;
}

function createService($portA, $portB, $token, $tm1)
{
    $response_array = array();
    $url = "https://".$_SESSION["BPServerAddr"]."/bpocore/market/api/v1/resources";
    $cmd = '{"username":"admin","password":"adminpw"}';

    
    $curl = curl_init();
    
curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{\"autoClean\":true,\"createdAt\":null,\"description\":null,\"desiredOrchState\":null,\"discovered\":false,\"label\":\"petaluma\",\"nativeState\":null,\"orchState\":null,\"orderId\":null,\"productId\":\"5928795a-da36-407d-bc48-90c5794dc7fb\",\"properties\":{\"region\":\"Metro\",\"customer\":\"592879d3-3dcd-4714-86d0-8a872b3529c2\",\"classOfServiceName\":\"RealTime\",\"ingressCir\":111,\"ingressPir\":222,\"nodeA_rid\":\"59287cfb-9b0e-4dbb-ac53-5e5b02064a3e\",\"portA_rid\":\"59287cfb-3c62-48dd-a9c4-bcd5d76952d2\",\"nodeA_svlan\":22,\"nodeZ_rid\":\"59287cb8-f0bb-41db-b431-ebae44fb9f43\",\"portZ_rid\":\"59287cfb-a414-46f7-9aa4-9719cb02231c\",\"nodeZ_svlan\":22},\"providerResourceId\":null,\"reason\":null,\"resourceTypeId\":null,\"shared\":false,\"tenantId\":null,\"updatedAt\":null,\"_hash\":null}",
        CURLOPT_HTTPHEADER => array(
        "accept: application/json, text/javascript, */*; q=0.01",
        "accept-encoding: gzip, deflate, br",
        "accept-language: en-US,en;q=0.8",
        "cache-control: no-cache",
        "connection: keep-alive",
        "content-type: application/json; charset=UTF-8",
        "cookie: uac.csrftoken=hNXPoP8DUPGCrovhhLZ3HiT12njZLrmg; uac.username=admin; uac.authorization=51c62a75efdd58ef0af9; uac.createdTime=2017-05-26T18:47:26Z; uac.expires_at=1495910847212; uac.expires_in=86400; uac.user_id=fbb55f49-67a7-488d-8330-1592e8477757",
        "origin: https://10.15.3.80",
        "postman-token: 16c3df36-1b8c-16d3-da2d-9c2855d1e0f5",
        "referer: https://10.15.3.80/orchestrate/",
        "user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36",
        "x-requested-with: XMLHttpRequest"
      ),
    ));
    
    $resp = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $response_array['code'] = $httpCode;
    if( $httpCode <> 201 )
    {
        $response_array['status'] = "ERROR (HTTP_CODE=".$httpCode.")";
        $response_array['info'] = $resp;
        $response_array['more'] = curl_error($curl);
    }
    else
    {
        $headers = get_headers_from_curl_response($resp);
        $response_array['status'] = SUCCESS;
        $response_array['info'] = $resp;
        $response_array['headers'] = $headers;
        
    }
    curl_close($curl);
    return $response_array;
}


?>