'use client';

import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import FormField from './FormField';

const ProjectForm = ({ type, session }: { type: string; session: SessionInterface }) => {
  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldName: string, value: string) => {};
  const form = {
    image: '',
    title: '',
    description: '',
    liveSiteURL: '',
    githubURL: ''
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input type="file" id="image" accept="image/*" required={type === 'create' ? true : false} className="form_image-input" onChange={handleChangeImage} />
        {form.image && <Image src={form?.image} className="sm:p-10 object-contain z-10" alt="Project poster" fill />}
      </div>

      <FormField title="Title" state={form.title} placeholder="Flexxible" setState={(value) => handleStateChange('title', value)} />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteURL}
        placeholder="https://www.google.com/"
        setState={(value) => handleStateChange('liveSiteURL', value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubURL}
        placeholder="https://github.com/AdamK18"
        setState={(value) => handleStateChange('githubURL', value)}
      />

      <div className="flexStart w-full">
        <button>Create</button>
      </div>
    </form>
  );
};

export default ProjectForm;
