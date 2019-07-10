let errors = {};

const UUID_PATTERN = /^[0-9A-Za-z]{4}:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/;

const validateUuid = uuid => {
  if (uuid === null) {
    return true;
  }

  if (uuid === '') {
    errors.uuid = 'The UUID cannot be an empty string';

    return false;
  }

  if (!UUID_PATTERN.test(uuid)) {
    errors.uuid = `The UUID ${uuid} is not a valid UUID`;

    return false;
  }

return true;
}

const validateFilename = filename => {
  if (filename.length === 0) {
    errors.filename = 'The filename cannot ben an empty string';

    return false;
  }
  
  return true;
}

const validateRevision = revision => {
  if (revision.length === 0) {
    errors.revision = 'The revision cannot be empty';
    
    return false;
  }

  if (isNaN(revision)) {
    errors.revision = 'The revision must be a number';

    return false;
  }

  return true;
}


const validateCreatedAt = (createdAt) => {
  if (`${createdAt}`.length === 0) {
    errors.createdAt = 'Creation date and time cannot be empty';

    return false;
  }

  return true;
};

const validateCategory = category => {
  if (category.length === 0) {
    errors.category = 'The category cannot be empty';

    return false;
  }

  if (isNaN(category)) {
    errors.category = 'The category must be a number';

    return false;
  }

  return true;
}

const validateContentType = contentType => {
  if (contentType.length === 0) {
    errors.contentType = 'Content Type cannot be empty';

    return false;
  }

  if (contentType.length > 255) {
    errors.contentType = 'Content Type length cannot be longer that 255 characters';

    return false;
  }

  return true;
}

const validateData = data => {
  if (data.length === 0) {
    errors.data = 'Data cannot be empty';

    return false;
  }

  return true;
}

const validate = (file) => new Promise((resolve) => {
  errors = {};
  
  validateUuid(file.uuid || null);
  validateRevision(file.revision || '');
  validateFilename(file.filename || '');
  validateData(file.data || '');
  validateCreatedAt(file.createdAt || '');
  validateContentType(file.contentType || '');
  validateCategory(file.category || '');

  resolve ({
    valid: Object.keys(errors).length === 0,
    errors,
  });
});

export default validate;