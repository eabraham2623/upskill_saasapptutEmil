class ContactsController < ApplicationController
    # Get Request to /contact-us
    # Show new contact form
    def new
        @contact = Contact.new
    end
    
    # POST request/create
    def create
        # Mass assignment of form fields  into contact object
        @contact = Contact.new(contact_params)
        # Save the contact object to the database
        if @contact.save
            # Store form fields via parameters, to variables
            name = params[:contact][:name]
            email = params[:contact][:email]
            body = params[:contact][:comments]
            # Plug variables into Contact mailer email method and send
            ContactMailer.contact_email(name,email,body).deliver #executing send
            # Store success message in flash hash
            # redirect to the new action
            flash[:success] = "Message Sent"
            redirect_to new_contact_path
        else
            # if it doesn't save
            # Store errors in flash hash
            # and redirect to new action
            flash[:danger] = @contact.errors.full_messages.join(", ")
            redirect_to new_contact_path
        end
    end
    private
    # to collect data from form, we need to use
    # strong parameters and whitelist the form fields, security
        def contact_params
            params.require(:contact).permit(:name, :email, :comments)
        end
end