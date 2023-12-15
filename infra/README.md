# Demo Sentry

This project is used to demo Sentry features

* Error Tracking
* Distributed Tracing
* Performance Monitoring

## App Features

1. Create new order (1 api)
2. Create job for sending email after 30 minutes (1 queue)
3. Allow user to pay the order (1 api). After complete transaction, a email with receipt url will be sent to the user.
4. At the end of the day, all unpaid order will be canceled (1 cronjob)
5. The App need to serve users around the world (computing "at the edge")
6. User can download receipt by email

## Resources

* Remix app (multiple instances)
* PostgresSQL database
* Message Queue
* Cronjob
* CDN
