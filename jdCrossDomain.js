/**
 * Created by Desenvolvimento Web1 on 15/09/16.
 * Módulo responsável pelo tratamento de comunicação do tipo crossdomain
 *
 * ***************************************************************************
 * Desenvolver: Rony Silva
 * Email: ronysilvati@live.com
 * ***************************************************************************
 * ===========================================================================
 */

var jdCrossDomain   = function(){
    var functionName    = 'jdCrossDomain';
    var version         = '0.0.1';

    return {

        /**
         * ====================================================
         * Efetua o desparo de uma mensagem para um dominio
         * ====================================================
         * @param message
         * @param elementId
         * @param domain
         */
        sendMessageToDomain: function(message,domain){
            if(message){
                try{
                    var message = message;
                    var domain  = (domain)? domain : '*';

                    window.top.postMessage(message,domain);
                }
                catch(err){
                    console.log(functionName+': ' + err.message);
                }
            }
        },
        /**
         * ================================================
         * Fica a aguardar mensagens enviadas, quando
         * "domain" é informado, apenas mensagens
         * do dominio em questão, serão aceitas
         * ================================================
         * @param domain
         * @param callback
         */
        receiveMessageFromDomain: function(domain,callback){
            try{

                if(callback && typeof callback == 'function'){
                    function receiveMessage(event)
                    {
                        if(domain){
                            if(event.origin == domain){
                                callback(event.data);
                            }
                        }
                        else{
                            callback(event.data);
                        }
                    }

                    window.top.addEventListener("message", receiveMessage, false);
                }
                else{
                    console.log(functionName+': Uma funcao de callback nao foi adicionada no ouvinte de mensagens');
                }
            }
            catch(err){
                console.log(functionName+': ' + err.message);
            }
        },
        getVersion: function(){
            return version;
        }
    }
}