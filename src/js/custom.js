// instancia jquery e evita conflitos
// jQuery( function($){
    $(document).ready(function(){

        /*
        * Controle do carrosel
        */
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 4,
                },
            }
        });


         /*
         * Abrir modal na navegação
         */
        $('.nav-modal-open').on('click', function(e){
            e.preventDefault()
            let elem = $(this).attr('rel')

            $('.modal-body').html($('#'+elem).html())
            $('.modal-header h5.modal-title').html($(this).text())

            let myModal = new bootstrap.Modal($('#modalId'))

            myModal.show()
        })

        /*
        * Validação de formulário
        */

        /* validar cpf com regex
        function cpfValidate() {
         let cpf = $('#cpf')

         let padraoCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

         cpf.addEventListener('input', function(){
            let texto = this.value

            if (padraoCPF.cpf(texto)) {

               cpf.parent().find('.text-muted').show()

               cpf.addClass('invalid')
            } else {
               cpf.parent().find('.text-muted').hide()
               cpf.removeClass('invalid')
            }
         })
        }*/

        function validate( elem ){
            if( elem.val() == '') {
      
               console.log('o campo de '+ elem.attr('name') + ' é obrigatório')
      
               elem.parent().find('.text-muted').show()
      
               elem.addClass('invalid')
      
               return false
            } else {
               elem.parent().find('.text-muted').hide()
               elem.removeClass('invalid')
            }
         }
      
         $('body').on('submit', '.modal-body .form', function(e){
      
            e.preventDefault()
      
            const inputName = $('#nome')
            const inputEmail = $('#email')
      
            validate(inputName)
            validate(inputEmail)
      
            if(inputEmail.hasClass('invalid') || inputName.hasClass('invalid')){
               console.log('verificar campos obrigatórios')
               return false
            } else {
               $(this).submit()  
            }
      
         })

         $('body').on('blur', '#nome', function(){
            validate($(this))
         })
      
         $('body').on('blur', '#email', function(){
            validate($(this))
         })

         $('body').on('blur', '#date', function(){
            validate($(this))
         })

         $('body').on('blur', '#time', function(){
            validate($(this))
         })

         $('body').on('blur', '#cep', function(){
            validate($(this))
         })

         $('body').on('blur', '#phone', function(){
            validate($(this))
         })

         $('body').on('blur', '#cpf', function(){
            validate($(this))
         })
      
      
         $('body').on('focus', '#date', function(){
            $(this).datepicker()
         })
      
         $('#modalId').on('shown.bs.modal', function () {
   
            $('#date').mask('00/00/0000');
         
         });         
      
         $('#modalId').on('shown.bs.modal', function (){
            
            $('#time').mask('00:00');
         })
      
         $('#modalId').on('shown.bs.modal', function (){
            
            $('#cep').mask('00000-000');
         })
      
         $('#modalId').on('shown.bs.modal', function (){
            
            $('#phone').mask('(00) 00000-0000');
         })

         $('#modalId').on('shown.bs.modal', function (e){
            
            $('#cpf').mask('000.000.000-00');
         })
      

         
        /* 
         $("#subscribe").submit(function(a){
            

            var dados = $("#subscribe").serialize();
		    $.form( dados, function (e){

                e.preventDefault()
                if (e) {
                    //Alerta de cadastro realizado com sucesso
                    $("#msg").html('<div class="alert alert-success" role="alert">Usuário cadastrado com sucesso!</div>');
                } else {

                }
             
            })
       
         })*/

         $("#cpf").mask("000.000.000-00");
        })
