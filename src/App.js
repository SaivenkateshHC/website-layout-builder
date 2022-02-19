import React, {useState} from "react";
import {Editor, Frame, Element, useEditor} from "@craftjs/core";
import {Typography, Paper, Grid, makeStyles, Button as MaterialButton} from "@material-ui/core";

import {SettingsPanel} from "./Components/SettingsPanel";
import {Toolbox} from "./Components/Toolbox";
import {Topbar} from "./Components/Topbar";
import {Button} from "./Components/Button";
import {Card, CardBottom, CardTop} from "./Components/Card";
import {Container} from "./Components/Container";
import {Text} from "./Components/Text";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(() => ({
	root: {
		padding: 0,
		background: "rgb(252, 253, 253)"
	}
}));
const App = () => {
	const classes = useStyles();
	const [state, setState] = useState(null);
	let navigate = useNavigate()
	return (
		<div style={{margin: "0 auto"}}>
			<Typography style={{margin: "20px 0"}} variant="h5" align="center">
				Basic Page Editor
			</Typography>
			<MaterialButton
				className="load-state-btn"
				size="small"
				variant="outlined"
				color="secondary"
				onClick={() => navigate('/output',{replace:false,state:state})}
			>
				Generate
			</MaterialButton>
			<Editor
				resolver={{
					Card,
					Button,
					Text,
					Container,
					CardTop,
					CardBottom
				}}
				onNodesChange={(query) => {
					let json = query.serialize();
					console.log(json);
					setState(json)

				}}
			>

				<Topbar/>
				<Grid container spacing={5} style={{paddingTop: "10px"}}>
					<Grid item xs={3}>
						<Paper className={classes.root}>
							<Toolbox/>
							{/*<SettingsPanel/>*/}
						</Paper>
					</Grid>
					<Grid item xs>
						<Frame>
							<Element
								canvas
								is={Container}
								padding={16}
								background="#eeeeee"
								data-cy="root-container"
							>
								{/*<Card data-cy="frame-card"/>*/}
								{/*<Button text="Click me" size="small" data-cy="frame-button"/>*/}
								{/*<Text fontSize={20} text="Hi world!" data-cy="frame-text"/>*/}
								{/*<Element*/}
								{/*	canvas*/}
								{/*	is={Container}*/}
								{/*	padding={6}*/}
								{/*	background="#999999"*/}
								{/*	data-cy="frame-container"*/}
								{/*>*/}
								{/*	<Text*/}
								{/*		size="small"*/}
								{/*		text="It's me again!"*/}
								{/*		data-cy="frame-container-text"*/}
								{/*	/>*/}
								{/*</Element>*/}
							</Element>
						</Frame>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.root}>
							{/*<Toolbox/>*/}
							<SettingsPanel/>
						</Paper>
					</Grid>
				</Grid>

			</Editor>
		</div>
	);
}
export default App