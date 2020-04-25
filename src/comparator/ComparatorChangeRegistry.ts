import { Comparator } from './Comparators'

export const CHANGE_REGISTRY: Record<
    Comparator.ChangeCode,
    Comparator.ChangeInfo<Comparator.ChangeCode>
> = {
    no_change: {
        code: 'no_change',
        description: 'Nothing is changed',
        action: 'none',
        status: 'compatible',
        memberType: 'common',
    },
    changed_member_type: {
        code: 'changed_member_type',
        description: 'Signature member type changed',
        action: 'changed',
        status: 'breaking',
        memberType: 'common',
    },
    member_removal: {
        action: 'removed',
        code: 'member_removal',
        description: 'Signature member removed from package',
        status: 'breaking',
        memberType: 'common',
    },
    changed_required_constructor_parameters_count: {
        action: 'changed',
        code: 'changed_required_constructor_parameters_count',
        description: 'Required parameters count in constructor has changed',
        memberType: 'class',
        status: 'breaking',
    },
    changed_constructor_parameter_modifier_to_optional: {
        action: 'changed',
        code: 'changed_constructor_parameter_modifier_to_optional',
        description: 'Constructor parameter became optional',
        memberType: 'class',
        status: 'compatible',
    },
    changed_constructor_parameter_modifier_to_required: {
        action: 'changed',
        code: 'changed_constructor_parameter_modifier_to_required',
        description: 'Constructor paramter became required',
        memberType: 'class',
        status: 'breaking',
    },
    changed_constructor_parameter_type: {
        action: 'changed',
        code: 'changed_constructor_parameter_type',
        description: 'Constructor parameter type changed',
        memberType: 'class',
        status: 'breaking',
    },
    changed_constructor_parameter_type_union: {
        action: 'changed',
        code: 'changed_constructor_parameter_type_union',
        description: 'Constructor parameter type changed to union type',
        memberType: 'class',
        status: 'compatible',
    },
    changed_method_return_type: {
        action: 'changed',
        code: 'changed_method_return_type',
        description: 'Method return type changed',
        memberType: 'class',
        status: 'breaking',
    },
    changed_method_return_type_union: {
        action: 'changed',
        code: 'changed_method_return_type_union',
        description: 'Method return type changed to union type',
        memberType: 'class',
        status: 'compatible',
    },
    changed_method_parameter_modifier_to_optional: {
        action: 'changed',
        code: 'changed_method_parameter_modifier_to_optional',
        description: 'Method parameter changed from required to optional',
        status: 'compatible',
        memberType: 'class',
    },
    changed_method_parameter_modifier_to_required: {
        code: 'changed_method_parameter_modifier_to_required',
        action: 'changed',
        description: 'Method parameter changed from optional to required',
        memberType: 'class',
        status: 'breaking',
    },
    changed_method_parameter_required_count: {
        code: 'changed_method_parameter_required_count',
        action: 'changed',
        description: 'Changed required parameters count in class method',
        memberType: 'class',
        status: 'breaking',
    },
    added_method: {
        action: 'added',
        code: 'added_method',
        description: 'Method added to class',
        memberType: 'class',
        status: 'compatible',
    },
    removed_method: {
        action: 'removed',
        code: 'removed_method',
        description: 'Method removed from class',
        memberType: 'class',
        status: 'breaking',
    },
    changed_method_modifier_more_visible: {
        action: 'changed',
        code: 'changed_method_modifier_more_visible',
        description: 'Method access modifier changed, to be less restrictive.',
        memberType: 'class',
        status: 'compatible',
    },
    changed_method_modifier_less_visible: {
        action: 'changed',
        code: 'changed_method_modifier_less_visible',
        description: 'Method access modifier changed, to be more restrictive.',
        memberType: 'class',
        status: 'breaking',
    },
    changed_property_modifier_more_visible: {
        action: 'changed',
        code: 'changed_property_modifier_more_visible',
        description: 'Property access modifier changed, to be less restrictive.',
        memberType: 'class',
        status: 'compatible',
    },
    changed_property_modifier_less_visible: {
        action: 'changed',
        code: 'changed_property_modifier_less_visible',
        description: 'Property access modifier changed, to be more restrictive.',
        memberType: 'class',
        status: 'breaking',
    },
    removed_class_property: {
        action: 'changed',
        code: 'removed_class_property',
        description: 'Property was removed from class.',
        memberType: 'class',
        status: 'breaking',
    },
    added_class_property: {
        action: 'added',
        code: 'added_class_property',
        description: 'Property was added to class.',
        memberType: 'class',
        status: 'compatible',
    },
    changed_class_property_type: {
        action: 'changed',
        code: 'changed_class_property_type',
        description: 'Property type was changed',
        memberType: 'class',
        status: 'breaking',
    },
    changed_class_property_type_union: {
        action: 'changed',
        code: 'changed_class_property_type_union',
        description: 'Property type was changed to less strict',
        memberType: 'class',
        status: 'compatible',
    },
    changed_class_property_to_readonly: {
        action: 'changed',
        code: 'changed_class_property_to_readonly',
        description: 'Property write access was changed to more strict',
        memberType: 'class',
        status: 'breaking',
    },
    changed_class_property_to_not_readonly: {
        action: 'changed',
        code: 'changed_class_property_type_union',
        description: 'Property write access was changed to less strict',
        memberType: 'class',
        status: 'compatible',
    },
    removed_generic: {
        action: 'removed',
        code: 'removed_generic',
        description: 'Class generic type was removed',
        memberType: 'class',
        status: 'breaking',
    },
    added_required_generic: {
        action: 'added',
        code: 'added_required_generic',
        description: 'Class generic type was added',
        memberType: 'class',
        status: 'breaking',
    },
    added_optional_generic: {
        action: 'added',
        code: 'added_optional_generic',
        description: 'Class optional generic type was added',
        memberType: 'class',
        status: 'compatible',
    },
    changed_generic_extends_type: {
        action: 'changed',
        code: 'changed_generic_extends_type',
        description: 'Class generic type constraint was changed',
        memberType: 'class',
        status: 'breaking',
    },
    changed_generic_extends_type_to_less_strict: {
        action: 'changed',
        code: 'changed_generic_extends_type_to_less_strict',
        description: 'Class generic constraint type was changed to less strict',
        memberType: 'class',
        status: 'compatible',
    },
    changed_constant_type: {
        action: 'changed',
        code: 'changed_constant_type',
        description: 'Variable constraint type was changed',
        memberType: 'constant',
        status: 'breaking',
    },
    changed_constant_type_to_less_strict: {
        action: 'changed',
        code: 'changed_constant_type_to_less_strict',
        description: 'Variable constraint type was changed to less strict',
        memberType: 'constant',
        status: 'compatible',
    },
}
