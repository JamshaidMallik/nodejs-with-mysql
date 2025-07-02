// mappingConfig.js

export default {
    'customers.csv': {
        table: 'customers',
        columns: [
            'customerId', 'firstName', 'lastName', 'company', 'city', 'country',
            'phone1', 'phone2', 'email', 'subscriptionDate', 'website'
        ],
        csvKeys: [
            'Customer Id', 'First Name', 'Last Name', 'Company', 'City', 'Country',
            'Phone 1', 'Phone 2', 'Email', 'Subscription Date', 'Website'
        ]
    },
    // Example: Add future mappings like this
    'peoples.csv': {
      table: 'peoples',
      columns: ['userId', 'firstName', 'lastName', 'sex', 'email', 'phone', 'dateOfBirth', 'jobTitle'],
      csvKeys: ['User Id', 'First Name', 'Last Name', 'Sex', 'Email', 'Phone', 'Date of birth', 'Job Title']
    }
};
