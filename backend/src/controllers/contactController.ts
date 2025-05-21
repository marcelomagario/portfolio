import { Request, Response } from 'express';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';


export const sendContactEmail = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    const sourceEmail = process.env.CONTACT_EMAIL_SOURCE;
    const destinationEmail = process.env.CONTACT_EMAIL_DESTINATION;
    const awsRegion = process.env.AWS_REGION;
    const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


    if (!sourceEmail || !destinationEmail || !awsRegion || !awsAccessKeyId || !awsSecretAccessKey) {
        console.error('Missing one or more AWS SES environment variables in .env');
        return res.status(500).json({ message: 'Server configuration error: AWS SES credentials or email addresses not fully set.' });
    }

    const sesClient = new SESClient({
        region: awsRegion,
        credentials: {
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey
        }
    });

    const params = {
        Source: sourceEmail,
        Destination: {
            ToAddresses: [destinationEmail]
        },
        Message: {
            Subject: {
                Data: `Portfolio Contact Form: Message from ${name}`
            },
            Body: {
                Text: {
                    Data: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                },
                Html: {
                    Data: `
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                    `
                }
            }
        }
    };
    try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error: any) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
};