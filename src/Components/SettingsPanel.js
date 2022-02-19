import { useEditor } from "@craftjs/core";
import {
	Box,
	Chip,
	Grid,
	Typography,
	Button as MaterialButton
} from "@material-ui/core";
import React, {useEffect} from "react";

export const SettingsPanel = (props) => {

	const { actions, selected, isEnabled } = useEditor((state, query) => {
		const currentNodeId = state.events.selected;
		let selected;
		// debugger

		// let obj = currentNodeId.size >0  && Object.assign(...Array.from(currentNodeId, v => ({[v]:''})))


		if ( currentNodeId.size > 0   ) {

			let obj = Object.assign(...Array.from(currentNodeId, v => ({[v]:''})))
			let originalNodeId = [Object.keys(obj)[0]][0].toString()
			selected = {
				id: originalNodeId,
				name: state.nodes[originalNodeId] && state.nodes[originalNodeId].data.name,
				settings:
					(state.nodes[originalNodeId] && state.nodes[originalNodeId].related) &&
					state.nodes[originalNodeId].related.settings,
				isDeletable: query.node(originalNodeId).isDeletable()
			};
		}

		return {
			selected,
			isEnabled: state.options.enabled
		};
	});



	return isEnabled && selected  ? (
		<Box bgcolor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>
			<Grid container direction="column" spacing={0}>
				<Grid item>
					<Box pb={2}>
						<Grid container alignItems="center">
							<Grid item xs>
								<Typography variant="subtitle1">Selected</Typography>
							</Grid>
							<Grid item>
								{selected.name &&
									<Chip
									size="small"
									color="primary"
									label={selected.name}
									data-cy="chip-selected"
								/>}
							</Grid>
						</Grid>
					</Box>
				</Grid>
				<div data-cy="settings-panel">
					{selected.settings && React.createElement(selected.settings)}
				</div>
				{selected.isDeletable ? (
					<MaterialButton
						variant="contained"
						color="default"
						onClick={() => {
							actions.delete(selected.id);
						}}
					>
						Delete
					</MaterialButton>
				) : null}
			</Grid>
		</Box>
	) : null;
};
