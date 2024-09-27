import * as React from 'react';
import { Button } from './ui/button';

interface EmailTemplateProps {
  msg: string;
}

interface EmailLinkTemplateProps {
  msg?: string;
  link: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  msg,
}) => (
  <div className='p-5 border'>
    <p className='text-blue-600 font-light'>Welcome, {msg}!</p>
  </div>
);

export const EmailLinkTemplate: React.FC<Readonly<EmailLinkTemplateProps>> = ({
  msg,
  link
}) => (
  <div className='p-5 border'>
    <p className='text-blue-600 font-light'>Welcome, {msg || "c'est un lien qui va vous permettre de modifier votre mot de passe"}!</p>
    <Button variant={"outline"} asChild>
        <a href={link} target='_blank' rel='noopener noreferrer'>
            Click here
        </a>
    </Button>
  </div>
);
