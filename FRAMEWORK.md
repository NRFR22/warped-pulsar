# Framework: Replacing Type Page Bubbles with Glossy Board Bubbles

## Problem Statement

We need to replace the old bubble visualization on individual type pages with the new glossy 3D bubbles from the board page, ensuring each bubble is individually accessible for future tooltip attachment.

## Current Architecture Issues

### Data Model Mismatch

**Board Page Data Flow:**
```
MBTI Type (e.g., "INFP") + Variant ("standard"/"jumper")
  ↓
generateStack() from typeDatabase.ts
  ↓
StackFunction[] with complete A/B/C/D data
  ↓
FunctionStackBoard component renders glossy bubbles
```

**Type Page Data Flow:**
```
TypeProfile (from types.ts)
  ↓
Contains: code (OPS notation like "Fi/Ne"), fullProfile (text)
  ↓
extractEnhancedContent() extracts MBTI from text
  ↓
??? How do we get to StackFunction[] ???
```

### The Core Problem

1. **OPS Code Ambiguity**: The `code` field (e.g., "Fe/Ne") only shows savior functions, not the full 4-function stack
2. **Multiple MBTI Matches**: Same OPS code can map to multiple MBTI types:
   - "Fe/Ne" could be ENFJ (Fe-Ni-Se-Ti) or ESFJ (Fe-Si-Ne-Ti)
   - Different full stacks, same saviors
3. **Variant Complexity**: Standard vs Jumper changes which functions are saviors
4. **MBTI Extraction**: MBTI code exists in `fullProfile` text but needs parsing

## Solution Architecture

### Option 1: Enhance Type Data (RECOMMENDED)

**Add MBTI field to TypeProfile interface:**

```typescript
export interface TypeProfile {
    code: string;           // OPS code: "Fe/Ne"
    mbti: string;           // NEW: "ENFJ"
    name: string;
    family: string;
    // ... other fields
}
```

**Advantages:**
- Clean, explicit data
- No ambiguity
- Easy to maintain
- Scales well

**Implementation Steps:**
1. Add `mbti` field to TypeProfile interface
2. Update all 32 type entries in types.ts with MBTI codes
3. Update extractEnhancedContent() to use direct mbti field
4. TypeFunctionStackBoard receives mbti prop directly

### Option 2: Smart OPS → MBTI Mapper

**Create intelligent mapping function:**

```typescript
function opsToMBTI(
    opsCode: string,       // "Fe/Ne"
    variant: string,       // "standard" or "jumper"
    profileText: string    // Full profile for context clues
): string | null {
    // 1. Parse OPS code to get saviors
    // 2. Look up possible MBTI matches
    // 3. Use variant + context to disambiguate
    // 4. Return definitive MBTI code
}
```

**Challenges:**
- Complex disambiguation logic
- Fragile (depends on text parsing)
- Harder to maintain
- May still have edge cases

### Option 3: Pre-compute Function Stacks

**Add functionStack to TypeProfile:**

```typescript
export interface TypeProfile {
    code: string;
    functionStack: FuncCode[];  // ["Fe", "Ni", "Se", "Ti"]
    // ... other fields
}
```

**Advantages:**
- No computation needed
- Explicit and clear
- Fast rendering

**Disadvantages:**
- Duplicates data that could be derived
- Need to maintain consistency with MBTI

## Recommended Implementation

### Phase 1: Data Enhancement

**File: `/src/data/types.ts`**

1. Add MBTI field to TypeProfile interface
2. Go through each type entry and add the MBTI code
   - Standard variants: Extract from fullProfile text
   - Verify accuracy against OPS theory

Example:
```typescript
{
    code: "Fe/Ne",
    mbti: "ESFJ",  // NEW
    name: "The Illuminator",
    // ...
}
```

### Phase 2: Update Extraction Logic

**File: `/src/lib/extractVariantContent.ts`**

Update extractEnhancedContent():
```typescript
export function extractEnhancedContent(type: TypeProfile): ExtractedContent {
    return {
        // ... existing fields
        mbti: type.mbti,  // Direct from data, no parsing needed
        // ...
    };
}
```

### Phase 3: Update Component

**File: `/src/components/types/TypeFunctionStackBoard.tsx`**

Simplify component to require MBTI:
```typescript
interface TypeFunctionStackBoardProps {
    mbti: string;  // Required, no ambiguity
    variant: 'standard' | 'jumper';
    size?: 'small' | 'medium' | 'large';
    onBubbleClick?: (bubble: StackFunction) => void;
}

export function TypeFunctionStackBoard({
    mbti,
    variant,
    size = 'large',
    onBubbleClick
}: TypeFunctionStackBoardProps) {
    const stack = generateStack(mbti, variant);

    // Render glossy bubbles with individual accessibility
    // Each bubble gets: data-bubble-id, data-function-code, data-is-savior
}
```

### Phase 4: Update Usage

**File: `/src/app/types/[slug]/VariantComparisonPage.tsx`**

```typescript
<TypeFunctionStackBoard
    mbti={standardContent.mbti}  // Clean, direct
    variant="standard"
    size="large"
/>
```

## Individual Bubble Accessibility

Each bubble must be individually selectable for tooltips:

```typescript
// SVG structure per bubble
<g
    key={func.id}
    data-bubble-id={func.id}              // "A", "B", "C", "D"
    data-function-code={func.code}        // "Fi", "Ne", etc.
    data-is-savior={func.isSavior}        // true/false
    onClick={() => onBubbleClick?.(func)}
>
    {/* Main bubble circle */}
    {/* Border circle */}
    {/* Shine overlay */}
    {/* Text label */}
</g>
```

**Tooltip attachment later:**
```javascript
// Example: Add tooltip to Fi function
document.querySelector('[data-function-code="Fi"]').addEventListener('mouseover', showTooltip);
```

## Verification Checklist

- [ ] All 32 types have MBTI codes in types.ts
- [ ] TypeProfile interface includes mbti field
- [ ] extractEnhancedContent() uses mbti field
- [ ] TypeFunctionStackBoard accepts mbti prop
- [ ] VariantComparisonPage passes mbti correctly
- [ ] Bubbles render with glossy 3D style
- [ ] Each bubble has data attributes for selection
- [ ] Hover effects work (1.1x scale)
- [ ] No "Error: could not parse" messages
- [ ] Standard and Jumper variants both work

## Testing Plan

1. **Data Validation**: Verify MBTI codes match OPS codes for all 32 types
2. **Visual Test**: Check glossy bubbles appear on all type pages
3. **Variant Test**: Confirm standard/jumper display correct function positions
4. **Accessibility Test**: Use DevTools to select bubbles by data attributes
5. **Hover Test**: Verify hover magnification works
6. **Tooltip Prep**: Ensure onclick handlers can be attached

## Migration Strategy

1. Create new TypeProfile interface with mbti field
2. Add MBTI codes to first 4 types as pilot
3. Test pilot types thoroughly
4. Add MBTI codes to remaining 28 types
5. Deploy and verify all type pages

## Alternative: Fallback Strategy

If we don't want to modify types.ts immediately:

**Extract MBTI from fullProfile text:**
```typescript
function extractMBTI(fullProfile: string): string {
    const match = fullProfile.match(/MBTI:\s*([A-Z]{4})/);
    if (!match) {
        throw new Error('MBTI not found in profile');
    }
    return match[1];
}
```

Use in component:
```typescript
const mbti = extractMBTI(type.fullProfile);
```

**Pros**: No data structure changes
**Cons**: Fragile, depends on text format consistency

## Conclusion

**Recommended approach**: Option 1 (Enhance Type Data)
- Clean architecture
- Explicit and maintainable
- Scalable for future features
- No ambiguity or fragility

**Key insight**: The problem isn't the component - it's that we're missing the MBTI → function stack mapping at the data layer. Fix the data model, and the component becomes trivial.
