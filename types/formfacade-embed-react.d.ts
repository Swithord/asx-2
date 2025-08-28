declare module '@formfacade/embed-react' {

  import * as React from 'react';



  interface FormfacadeEmbedProps {

    formFacadeURL?: string;

    onSubmitForm?: (...args: any[]) => any;

    [key: string]: any;

  }



  const FormfacadeEmbed: React.ComponentType<FormfacadeEmbedProps>;

  export default FormfacadeEmbed;

}