import twilio from "twilio"

class Twilio {
  constructor() {
    this.client = twilio(
      'AC9400af563ea46b42b3255f287abXXXXX',
      '65406c430c90d00268ef9bf0720XXXXX'
    );
    this.accountSid = 'AC9400af563ea46b42b3255f287abXXXXX';
    this.authToken = '65406c430c90d00268ef9bf0720XXXXX';
    this.verifyServiceSid = 'VAaa47973652ccaabfc582ed8c1afXXXXX';
  }

  sendVerificationCode(options) {
    return this.client.verify
      .verificationServices(this.verifyServiceSid)
      .verifications.create({ to: options.to, channel: 'sms' });
  }

  checkVerificationCode(options) {
    return this.client.verify
      .verificationServices(this.verifyServiceSid)
      .verificationChecks.create({
        to: options.to,
        code: options.code,
      });
  }
}

module.exports = Twilio;

