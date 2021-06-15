import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function AboutTab() {
	return (
		<div style={{width: '70%', maxWidth: 700, margin: 'auto' }}>
			<div className="md:flex max-w-2xl">
				<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
					<Card className="w-full mb-32 rounded-16 shadow">
                        <div style={{ padding: '1rem'}}>
                            <Avatar alt="Remy Sharp" src="/1.jpg" style={{width: 150, height: 150, margin: 'auto'}} />
                        </div>
						<AppBar position="static" elevation={1} style={{backgroundColor: 'red'}}>
							<Toolbar className="px-8">
								<Typography color="inherit" className="flex-1 px-12 font-medium" style={{fontSize: 22}}>
									General Information
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>Gender</Typography>
								<Typography style={{fontSize: 18}}>Karin Barinova</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>Email</Typography>
                                <Typography style={{fontSize: 18}}>kbarinova11@gmail.com</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>About Me</Typography>
								<Typography style={{fontSize: 18}}>Type here...</Typography>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default AboutTab;
