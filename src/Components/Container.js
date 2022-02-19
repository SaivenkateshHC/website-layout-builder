import {useEditor, useNode} from "@craftjs/core";
import {FormControlLabel, Grid, Radio, RadioGroup, Slider} from "@material-ui/core";
import {Paper, FormControl, FormLabel} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import React, {useEffect, useState} from "react";

export const Container = ({
	                          background,
	                          padding,
	                          gap,
	                          size,
	                          item,
	                          horizontalAlign,
	                          verticalAlignment,
	                          height,
	                          children,
	                          ...props
                          }) => {
	const {
		connectors: {connect, drag},
		node,
		actions: {setProp}
	} = useNode((node) => ({node}));

	const {
		actions: {history}
	} = useEditor();
	const {actions, selectedNodeId} = useEditor((state) => ({
		selectedNodeId: state.events.selected
	}));

	useEffect(() => {
		console.log("adding a custom prop");
		/*setProp((props) => {
		  //props.background = "red";
		  props["data-test"] = true;
		});*/
		history.ignore().setProp(node.id, (props) => {
			//props.background = "red";
			props["data-test"] = true;
		});
	}, []);

	return (
		<Grid item={item} container xs={size}
		      {...props}
		      ref={(ref) => connect(drag(ref))}
		      onClick={() => {

		      }}
		      style={{
			      alignItems: verticalAlignment,
			      justifyContent: horizontalAlign,
			      columnGap: `${gap}px`,
			      margin: "5px 0",
			      background,
			      padding: `${padding}px`,
			      height: `${height}`
		      }}
		>
			{children}
		</Grid>
	);
};

export const ContainerSettings = () => {
	const [heightState, setHeightState] = useState("100%");
	const {
		background,
		padding,
		gap,
		size,
		item,
		height,
		horizontalAlign,
		verticalAlignment,
		actions: {setProp}
	} = useNode((node) => ({
		background: node.data.props.background,
		padding: node.data.props.padding,
		gap: parseInt(node.data.props.gap),
		size: node.data.props.size,
		horizontalAlign: node.data.props.horizontalAlign,
		verticalAlignment: node.data.props.verticalAlignment,
		height: node.data.props.height

	}));

	return (
		<div>
			<FormControl fullWidth={true} margin="normal" component="fieldset">
				<FormLabel component="legend">Background</FormLabel>
				<ColorPicker
					name="background-color"
					value={background}
					onChange={(color) => {
						setProp((props) => (props.background = color), 500);
					}}
				/>
			</FormControl>
			<FormControl fullWidth={true} margin="normal" component="fieldset">
				<FormLabel component="legend">Padding - {padding}</FormLabel>
				<Slider
					defaultValue={padding}
					onChange={(_, value) =>
						setProp((props) => (props.padding = value), 500)
					}
				/>
			</FormControl>
			<FormControl fullWidth={true} margin="normal" component="fieldset">
				<FormLabel component="legend">Height - {height}</FormLabel>
				{/*<Slider*/}
				{/*	defaultValue={height}*/}
				{/*	onChange={(_, value) =>*/}
				{/*		setProp((props) => (props.height = value), 500)*/}
				{/*	}*/}
				{/*/>*/}
				<input onChange={(e) =>
					setHeightState(e.target.value)}/>
				<button onClick={(_, value) => {

					setProp((props) => (props.height = heightState), 500)
				}}>Submit
				</button>
			</FormControl>
			<FormControl fullWidth={true} margin="normal" component="fieldset">
				<FormLabel component="legend">gap - {gap}</FormLabel>
				<Slider
					defaultValue={gap}
					onChange={(_, value) =>
						setProp((props) => (props.gap = value), 500)
					}
				/>
			</FormControl>
			<FormControl fullWidth={true} margin="normal" component="fieldset">
				<FormLabel component="legend">size - {size}</FormLabel>
				<Slider
					defaultValue={size}
					onChange={(_, value) =>
						setProp((props) => (props.size = value), 500)
					}
				/>
				{/*<input value={size} onChange={(_, value) =>*/}
				{/*		setProp((props) => (props.size = value), 500)}/>*/}
			</FormControl>
			<FormControl size="small" component="fieldset" >
				<FormLabel component="legend">Horizontal Alignment</FormLabel>
				<RadioGroup
					defaultValue={horizontalAlign}
					onChange={(e) => setProp((props) => (props.horizontalAlign = e.target.value))}
				>
					<FormControlLabel
						label="Center"
						value={"center"}
						control={<Radio size="small" color="primary"/>}
					/>
					<FormControlLabel
						label="Left"
						value={"start"}
						control={<Radio size="small" color="primary"/>}
					/>
					<FormControlLabel
						label="Right"
						value={"end"}
						control={<Radio size="small" color="primary"/>}
					/>
				</RadioGroup>
			</FormControl>
			<FormControl size="small" component="fieldset">
				<FormLabel component="legend">Vertical Alignment</FormLabel>
				<RadioGroup
					defaultValue={verticalAlignment}
					onChange={(e) => setProp((props) => (props.verticalAlignment = e.target.value))}
				>
					<FormControlLabel
						label="Center"
						value={"center"}
						control={<Radio size="small" color="primary"/>}
					/>
					<FormControlLabel
						label="Left"
						value={"start"}
						control={<Radio size="small" color="primary"/>}
					/>
					<FormControlLabel
						label="Right"
						value={"end"}
						control={<Radio size="small" color="primary"/>}
					/>
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export const ContainerDefaultProps = {
	background: "#ffffff",
	padding: 3,
	gap: 0,
	size: 12,
	item: false,
	horizontalAlign: "start",
	verticalAlignment: "start",
	height: '100%'
};

Container.craft = {
	props: ContainerDefaultProps,
	related: {
		settings: ContainerSettings
	}
};
