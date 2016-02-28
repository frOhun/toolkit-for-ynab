(function poll() {
  // Waits until an external function gives us the all clear that we can run (at /shared/main.js)
  if ( typeof ynabToolKit !== "undefined"  && ynabToolKit.actOnChangeInit === true ) {

    ynabToolKit.toggleTransactionFilters = new function()  { // Keep feature functions contained within this

	  function toggleReconciled()
	  {
		
	  }
	  
	  function toggleScheduled()
	  {
	  
	  }
	  
	  


      this.invoke = function() 
      {	
		if (/accounts/.test(window.location.href)) 
		{
			/*
				Need to improve by checking Ember for filter settings, 
				rather than checking for classes of transactions rows that change
				
				ynab.utilities
				
				this.budgetView = ynab.YNABSharedLib
				  .getBudgetViewModel_AllBudgetMonthsViewModel()._result; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
				  
				var grid = Ember.View.views[Ember.keys(Ember.View.views)[0]].container.lookup('view:ynab-grid/index');
				var rowHeight = 30 + (10 * ynabToolKit.options.accountRowsHeight);
				grid.set('recordHeight', rowHeight);  
				
				
				
				
				
				Controller: App.AccountsController
				Name: modals.account.filters
				Template: modals.account.filters
				
				renderedName: modals.account.filters
				stored in: App/Modals/account/filtersView "reconciled" and "scheduled" booleans
				
				access using get, set using set
				
				controller.set('reconciled', !this.get('reconciled'));
			*/
			
			var grid = Ember.View.views[Ember.keys(Ember.View.views)[0]].container.lookup('model:accounts');
			var setting_reconciled = grid.get('reconciled');  
			
			console.log(grid);
//			console.log(setting_reconciled);
		
			// check transaction visibility
			if ( $('.is-reconciled-row').length ) { var reconciled_visibility = 'visible'; } else { var reconciled_visibility = 'hidden'; }
			if ( $('.is-scheduled').length ) { var scheduled_visibility = 'visible'; } else { var scheduled_visibility = 'hidden'; }	
			
			// create button markup
			var button_reconciled_markup = '<button id="toggleReconciled" class="ember-view button button-toggle-'+reconciled_visibility.toLowerCase()+'">Reconciled</button>';
			var button_scheduled_markup = '<button id="toggleScheduled" class="ember-view button button-toggle-'+scheduled_visibility.toLowerCase()+'">Scheduled</button>';
			
			// insert or edit buttons
			if (! $("#toggleReconciled").length ) 
			{
				$(".accounts-toolbar .accounts-toolbar-right").append(button_scheduled_markup);		
				$(".accounts-toolbar .accounts-toolbar-right").append(button_reconciled_markup);
				$(".accounts-toolbar .accounts-toolbar-right").append('<span class="label">Show:</span>');	
			}
			else 
			{
				if (reconciled_visibility == 'visible') {
					$('#toggleReconciled').removeClass('button-toggle-hidden').addClass('button-toggle-visible');
				}
				else {
					$('#toggleReconciled').addClass('button-toggle-hidden').removeClass('button-toggle-visible');
				}
				if (scheduled_visibility == 'visible') {
					$('#toggleScheduled').removeClass('button-toggle-hidden').addClass('button-toggle-visible');
				}
				else {
					$('#toggleScheduled').addClass('button-toggle-hidden').removeClass('button-toggle-visible');
				}
			}
			
			
			$('button#toggleReconciled').on('click', toggleReconciled);
			$('button#toggleScheduled').on('click', toggleScheduled);	  
		}
      },
      
      this.observe = function(changedNodes) {
		  if ( changedNodes.has('ynab-grid-body') ) {
		    ynabToolKit.toggleTransactionFilters.invoke();
		  }
	  };
			
    };
    
	ynabToolKit.toggleTransactionFilters.invoke();
  } else {
    setTimeout(poll, 250);
  }
})();
