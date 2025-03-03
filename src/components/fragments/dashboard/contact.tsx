
import { Label } from '@/components/elements/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/elements/card'
import { Textarea } from '@/components/elements/textarea'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/elements/alert'
import { Input } from '@/components/elements/input'
import { Button } from '@/components/elements/button'

const ContactUs = () => {
    return (
        <div className='pt-10'>
            <div className="bg-gradient-to-br from-teal-900 to-blue-900 p-6 rounded-3xl shadow-lg">
                <div className='flex flex-col md:flex-row'>
                    <Card className="md:w-3/4 w-full bg-white shadow-md rounded-xl">
                        <CardHeader>
                            <CardTitle className='text-3xl'>Send a Message</CardTitle>
                            <CardDescription>Send me a message with any problems or suggestions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Name" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" placeholder="email@gmail.com" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="note">Notes</Label>
                                        <Textarea placeholder="Type your message here." />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button>Submit</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className='text-black'>Announcement</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Sorry, the feature is not available yet
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Back</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                    <Card className="md:w-1/4 w-full md:ml-1 mt-2 md:mt-0 bg-white shadow-md rounded-xl">
                        <CardHeader>
                            <CardTitle className='text-center text-3xl'>Special Thanks</CardTitle>
                            <p className="text-sm">
                                We would like to thank you, our users, for trusting and using this system..
                            </p>
                            <ul className="mt-4 text-left space-y-3 text-sm">
                                <li>✅ <strong>Your trust</strong> in using our system to detect dental abnormalities.</li>
                                <li>✅ <strong>Very valuable input & suggestions</strong> to improve the quality of our services.</li>
                                <li>✅ <strong>Support & Enthusiasm</strong> that motivates us to continue to grow.</li>
                            </ul>
                            <p className="mt-6 text-sm font-semibold">
                                Thank you for being part of this journey!  💙
                            </p>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
